import multer from "multer";
import fs from "fs";
import User from "../models/User.js"; // Adjust path as needed
import mongoose from "mongoose";
import Admin from "../models/Admin.js"; // Adjust path as needed


export const uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Read the image file and convert it to a buffer
    const imageData = fs.readFileSync(req.file.path);
    const contentType = req.file.mimetype; // Get file type (image/png, image/jpeg, etc.)

    // Update the user's profile with the new image
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: { data: imageData, contentType } },
      { new: true }
    );

    // Delete the temp file after storing in MongoDB
    fs.unlinkSync(req.file.path);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Image uploaded successfully." });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// to get the user profile image

export const getProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    const user = await User.findById(userId);

    if (!user || !user.profilePic || !user.profilePic.data) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Convert Buffer to Base64
    const base64Image = user.profilePic.data.toString("base64");

    res.json({
      imageUrl: `data:${user.profilePic.contentType};base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};






export const uploadAdminProfileImage = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid adminId." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get file buffer and content type
    const imageData = fs.readFileSync(req.file.path);
    const contentType = req.file.mimetype;

    // Find the admin and update profilePic field
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { profilePic: { data: imageData, contentType } },
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Profile image uploaded successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// GET ADMIN PROFILE IMAGE
export const getAdminProfileImage = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid adminId." });
    }

    const admin = await Admin.findById(adminId);

    if (!admin || !admin.profilePic || !admin.profilePic.data) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Convert Buffer to Base64
    const base64Image = admin.profilePic.data.toString("base64");

    res.json({
      imageUrl: `data:${admin.profilePic.contentType};base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
