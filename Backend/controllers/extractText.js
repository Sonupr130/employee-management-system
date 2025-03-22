import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

const convertGoogleDriveLink = (resumeUrl) => {
  const fileIdMatch = resumeUrl.match(/(?:\/d\/|id=)([^\/?]+)/);
  if (!fileIdMatch) throw new Error("Invalid Google Drive URL format.");

  const fileId = fileIdMatch[1];
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${GOOGLE_DRIVE_API_KEY}`;
};

export const extractTextFromURL = async (resumeUrl) => {
  try {
    const directUrl = convertGoogleDriveLink(resumeUrl);
    console.log("Fetching resume from:", directUrl);

    const response = await axios.get(directUrl, { responseType: "arraybuffer" });

    const contentType = response.headers["content-type"];
    console.log(`Content-Type received: ${contentType}`);

    if (!contentType || !contentType.includes("pdf")) {
      throw new Error("Invalid file type. Google Drive may require authentication.");
    }

    console.log("✅ Fetched PDF successfully.");
    return Buffer.from(response.data).toString("base64"); // Convert to base64 for OpenAI
  } catch (error) {
    console.error("❌ Error fetching file from Google Drive:", error.message);
    return null;
  }
};
