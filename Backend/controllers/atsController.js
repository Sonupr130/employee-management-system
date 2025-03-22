import Candidate from "../models/CandidateShema.js";
import Job from "../models/JobSchema.js"; // ✅ Import Job model to fetch job title
import { downloadResume } from "../Utils/downloadResume.js";
import { extractTextFromPDF, extractTextFromDOCX } from "../Utils/extractResume.js";
import { calculateAtsScore } from "../Utils/calculateAts.js";
import fs from "fs";



export const calculateAtsScoreForCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({ atsScore: { $exists: false } });

    for (const candidate of candidates) {
      if (!candidate.resumeLink) {
        console.warn(`⚠️ Skipping candidate ${candidate._id}: No resume link.`);
        continue;
      }

      // ✅ Fetch job title using candidate's jobId
      const job = await Job.findById(candidate.jobId);
      if (!job || !job.title) {
        console.error(`❌ Error: No job found for candidate ${candidate._id}. Skipping...`);
        continue;
      }
      const jobTitle = job.title.trim();
      console.log(`🔍 Job Title for Candidate ${candidate._id}: ${jobTitle} Name: ${candidate.name}`);

      // ✅ Download resume and get the correct file path
      const filePath = await downloadResume(candidate.resumeLink, candidate._id);
      if (!filePath) {
        console.error(`❌ Failed to download resume for ${candidate._id}`);
        continue;
      }

      // ✅ Ensure the file exists before processing
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: Resume file not found for ${candidate._id}: ${filePath}`);
        continue;
      }

      // ✅ Extract text based on file type
      let resumeText;
      if (filePath.endsWith(".pdf")) {
        resumeText = await extractTextFromPDF(filePath);
      } else {
        resumeText = await extractTextFromDOCX(filePath);
      }

      // ✅ Ensure resumeText is valid
      if (!resumeText || typeof resumeText !== "string" || resumeText.trim() === "") {
        console.error(`❌ Error: Failed to extract valid text from resume for ${candidate._id}`);
        continue;
      }

      // ✅ Calculate ATS score using Job Title
      const atsScore = calculateAtsScore(resumeText, jobTitle);
      console.log(`✅ ATS Score for ${candidate._id}:`, atsScore);

      // ✅ Only update atsScore in MongoDB
      await Candidate.updateOne(
        { _id: candidate._id },
        { $set: { atsScore: atsScore } } // Fixed ✅
      );
      

      // ✅ Safely delete the resume file after processing
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted file: ${filePath}`);
        console.log(`--------------------------------`);
        console.log("");
      } catch (unlinkError) {
        console.error(`❌ Error deleting file ${filePath}:`, unlinkError.message);
      }
    }

    res.json({ message: "✅ ATS Scores updated successfully!" });
  } catch (error) {
    console.error("❌ Error in ATS Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







