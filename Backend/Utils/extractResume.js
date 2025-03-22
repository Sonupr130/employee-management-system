import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import path from "path";

// ✅ Extract Text from PDF
export const extractTextFromPDF = async (fileName) => {
  try {
    // ✅ Force the correct path
    const filePath = path.resolve("Backend/resume", fileName);
    console.log("🔍 Trying to read PDF from:", filePath);

    // ✅ Check if the file exists BEFORE reading
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ File not found: ${filePath}`);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error.message);
    return null;
  }
};



// ✅ Extract Text from DOCX
export const extractTextFromDOCX = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
    const { value } = await mammoth.extractRawText({ path: filePath });
    return value;
  } catch (error) {
    console.error("❌ Error extracting text from DOCX:", error.message);
    return null;
  }
};
