import natural from "natural";



export const calculateAtsScore = (resumeText, jobDescription) => {

  
  // ✅ Ensure inputs are valid strings
  if (!resumeText || typeof resumeText !== "string") {
    console.error("❌ Error: resumeText is missing or not a string.");
    return 0; // Return 0 ATS score if the resume text is invalid
  }

  if (!jobDescription || typeof jobDescription !== "string") {
    console.error("❌ Error: jobDescription is missing or not a string.");
    return 0; // Return 0 ATS score if the job description is invalid
  }

  const tokenizer = new natural.WordTokenizer();
  const resumeWords = tokenizer.tokenize(resumeText.toLowerCase());
  const jobWords = tokenizer.tokenize(jobDescription.toLowerCase());

  if (jobWords.length === 0) {
    console.error("❌ Error: Job description contains no valid words.");
    return 0;
  }

  const commonWords = resumeWords.filter((word) => jobWords.includes(word));
  return Math.round((commonWords.length / jobWords.length) * 100);
};
