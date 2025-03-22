import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


import Job from '../models/JobSchema.js';


export const getJobs = async (req, res) => {
  try {
    // const jobs = await Job.find();
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const addJob = async (req, res) => {
//   const { title, company, type, location, postedDate, expirationDate } = req.body;
//   const newJob = new Job({ title, company, type, location, postedDate, expirationDate });

//   try {
//     const savedJob = await newJob.save();
//     res.status(201).json(savedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// export const addJob = async (req, res) => {
//   const { title, company, type, location, postedDate, expirationDate } = req.body;

//   const jobLink = `${process.env.FRONTEND_URL}/job/${uuidv4()}`;  // Generate unique link

//   const newJob = new Job({ title, company, type, location, postedDate, expirationDate, jobLink });

//   try {
//     const savedJob = await newJob.save();
//     console.log(savedJob);
//     res.status(201).json(savedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const deleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      console.log("Deleting job with ID in backend:", jobId);

      // Validate job ID format
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: 'Invalid Job ID format' });
      }

      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        return res.status(404).json({ message: 'Job not found' });
      }

      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error in deleteJob:', error);  // Log error for debugging
      res.status(500).json({ message: 'Error deleting record', error });
    }
};

  
export const addJob = async (req, res) => {
  const { title, company, type, location,description, postedDate, expirationDate } = req.body;

  // Create the new job object without UUID
  const newJob = new Job({ title, company, type, location,description, postedDate, expirationDate });

  try {
    // Save the new job to the database
    const savedJob = await newJob.save();
    console.log(savedJob);

    // Use the saved job's _id to create the job link
    const jobLink = `${process.env.FRONTEND_URL}/job/${savedJob._id}`;

    // Update the saved job with the correct jobLink
    savedJob.jobLink = jobLink;

    // Save the updated job link to the database
    await savedJob.save();

    // Respond with the saved job data
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
