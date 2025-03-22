import Candidate from '../models/CandidateShema.js';
import Job from '../models/JobSchema.js';
import mongoose from 'mongoose';

export const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { name, email, phone, resumeLink } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const newCandidate = new Candidate({
      jobId,
      name,
      email,
      phone,
      resumeLink,
    });

    await newCandidate.save();
    res.status(201).json({ message: 'Application submitted successfully', candidate: newCandidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getCandidates = async (req, res) => {
//   try {
//     const candidates = await Candidate.find();
//     res.status(200).json(candidates);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().lean();
    
    const jobIds = candidates.map(candidate => candidate.jobId).filter(id => id);
    const jobs = await Job.find({ _id: { $in: jobIds } }).select("title location").lean();
    
    const jobMap = jobs.reduce((acc, job) => {
      acc[job._id] = { title: job.title, location: job.location };
      return acc;
    }, {});
    
    const candidatesWithJobs = candidates.map(candidate => ({
      ...candidate,
      jobTitle: jobMap[candidate.jobId]?.title || "N/A",
      jobLocation: jobMap[candidate.jobId]?.location || "N/A",
    }));

    res.status(200).json(candidatesWithJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getCandidatesByJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const candidates = await Candidate.find({ jobId });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// In your job controller or routes file

export const getJobByLink = async (req, res) => {
  console.log("Backend received jobLink:", req.params.jobLink);
  const { jobLink } = req.params;
  

  try {
    const job = await Job.findOne({ jobLink });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};