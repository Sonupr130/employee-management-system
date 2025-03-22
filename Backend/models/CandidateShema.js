// models/Candidate.js

import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },  
  name: {type:String},                                                  
  email: {type:String},                                                
  phone: {type:Number},                                                 
  resumeLink: {type:String},   
  atsScore: { type: Number, default: null },                                         
  appliedDate: { 
    type: String,
    default: () => new Date().toISOString().split('T')[0],  
  }            
});

export default mongoose.model('Candidate', CandidateSchema);
