import compromise from "compromise";

// ✅ Extract Email, Phone, and Skills
export const extractResumeData = (resumeText) => {
  const emailMatch = resumeText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/);
  const phoneMatch = resumeText.match(/\b\d{10}\b/);

  return {
    name: resumeText.split("\n")[0]?.trim() || "Unknown",
    email: emailMatch ? emailMatch[0] : "Not Found",
    phone: phoneMatch ? phoneMatch[0] : "Not Found",
    skills: compromise(resumeText).topics().out("array").slice(0, 10),
  };
};



// import compromise from "compromise";

// // ✅ Extract Email, Phone, and Skills
// export const extractResumeData = (resumeText) => {
//   const emailMatch = resumeText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/);
//   const phoneMatch = resumeText.match(/\b\d{10}\b/);

//   return {
//     name: resumeText.split("\n")[0]?.trim() || "Unknown",
//     email: emailMatch ? emailMatch[0] : "Not Found",
//     phone: phoneMatch ? Number(phoneMatch[0]) : null, // ✅ Fix applied here
//     skills: compromise(resumeText).topics().out("array").slice(0, 10),
//   };
// };
