import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    trim: true,
      // Limit description length to 500 characters
  },
  postedDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  expirationDate: {
    type: String,
    required: true,
  },
  jobLink: { type: String, unique: true },
}, 
{ timestamps: true });  // Add timestamps here

export default mongoose.model('Job', jobSchema);
