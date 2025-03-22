import fs from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";  // ✅ Fix for __dirname in ES modules


dotenv.config();
const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Convert Google Drive Link to Direct Download
const convertGoogleDriveLink = (resumeUrl) => {
  const match = resumeUrl.match(/(?:\/d\/|id=)([^\/?]+)/);
  if (!match) {
    console.error("❌ Invalid Google Drive URL:", resumeUrl);
    return null;
  }
  return `https://www.googleapis.com/drive/v3/files/${match[1]}?alt=media&key=${GOOGLE_DRIVE_API_KEY}`;
};

// ✅ Download Resume and Save in `/resume/`
export const downloadResume = async (resumeUrl, candidateId) => {
  try {
    const directDownloadUrl = convertGoogleDriveLink(resumeUrl);
    if (!directDownloadUrl) return null;

    console.log("📥 Downloading resume from:", directDownloadUrl);
    const response = await axios.get(directDownloadUrl, { responseType: "arraybuffer" });

    const contentType = response.headers["content-type"];
    const fileExtension = contentType.includes("pdf") ? "pdf" : "docx";

    // ✅ Fix the path to ensure absolute resolution
    const resumeDir = path.join(__dirname, "resume");  // 🔹 Ensure correct path
    if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });

    const filePath = path.join(resumeDir, `${candidateId}.${fileExtension}`);
    fs.writeFileSync(filePath, response.data);

    console.log(`✅ Resume saved at: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("❌ Error downloading resume:", error.message);
    return null;
  }
};
