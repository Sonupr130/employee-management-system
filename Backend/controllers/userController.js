import User from "../models/User.js"; // Assuming you have a User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator"; // For validation middleware
import mailjet from "node-mailjet";

import dotenv from "dotenv";
dotenv.config();


// email verfied registration
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    receiveNewsletters,
    agreeTerms,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Send email with plaintext password using Mailjet
    await mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: "HR Management System",
          },
          To: [
            {
              Email: email,
              Name: `${firstName} ${lastName}`,
            },
          ],
          Subject: "Your HR Management System Login Credentials",
          TextPart: `Hello ${firstName},\n\nWelcome to Kris Software Consultancy! We're thrilled to have you on board.\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and update your password at your earliest convenience.\n\nLooking forward to achieving great things together!\n\nBest regards,\nThe [Your Company Name] HR Team`,
          HTMLPart: `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #007BFF; text-align: center;">Welcome to Our Organization, ${firstName}!</h2>
                <p>We are excited to have you as part of our team at <strong>Kris Software Consultancy</strong>. Let's achieve great things together!</p>
                <p><strong>Your Login Credentials:</strong></p>
                <ul>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>Please log in and update your password as soon as possible to ensure your account's security.</p>
                <p>If you have any questions, feel free to reach out to our HR team anytime.</p>
                <p style="text-align: center; margin-top: 20px;"><a href="http://localhost:5173/" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Now</a></p>
                <p style="margin-top: 20px;">We look forward to working with you and achieving success together!</p>
                <p>Best regards,</p>
                <p><strong>The Kris Software Consultancy HR Team</strong></p>
                </div>`,
        },
      ],
    });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      receiveNewsletters,
      agreeTerms,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        receiveNewsletters: newUser.receiveNewsletters,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// [ BULK REGISTER-USER-API]
export const bulkRegisterUsers = async (req, res) => {
  const users = req.body;

  // Validate each user object in the array
  const errors = [];
  for (const user of users) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      receiveNewsletters,
      agreeTerms,
    } = user;

    // Check if passwords match for each user
    if (password !== confirmPassword) {
      errors.push({ email, message: "Passwords do not match" });
      continue; // Skip this user if passwords don't match
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.push({ email, message: "User already exists" });
      continue; // Skip this user if they already exist
    }
  }

  // If there are any errors, respond with the error messages
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Process each user and create them
    const createdUsers = [];
    for (const user of users) {
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        receiveNewsletters,
        agreeTerms,
      } = user;

      // Hash the password for each user
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user (excluding confirmPassword)
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        receiveNewsletters,
        agreeTerms,
      });

      // Save user to the database
      await newUser.save();

      // Add the new user to the createdUsers array
      createdUsers.push({
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        receiveNewsletters: newUser.receiveNewsletters,
      });
    }

    // Generate JWT tokens for the created users
    const tokens = createdUsers.map((user) =>
      jwt.sign(
        { userId: user.id }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Expiration time
      )
    );

    res.status(201).json({
      message: "Users registered successfully",
      users: createdUsers,
      tokens,
    });
  } catch (error) {
    console.error("Error during bulk registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// USER LOGIN CONTROLLLER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Prevent admins from logging in through the user login route
    if (user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized access for users." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName, // Add firstName
        lastName: user.lastName,   // Add lastName
        email: user.email,
        phone: user.phone,         
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// USER LOGOUT CONTROLLER
export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error during logout" });
  }
};

// UPDATE USER PROFILE
export const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received userId:", userId);
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      console.log("User not found in the database.");
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in editProfile controller:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// updation for profile pic

export const edittProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT token
    console.log("Received userId from token:", userId);

    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      console.log("User not found in the database.");
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in editProfile controller:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//GET USER BY ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// GET USER PROFILE
export const userProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Assuming session-based auth
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ fullName: user.fullName, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATING USER CONTACT DETAILS
export const updateContactDetails = async (req, res) => {
  try {
    const { phone, phone2, email, state, city, address } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phone = phone || user.phone;
    user.phone2 = phone2 || user.phone2;
    user.email = email || user.email;
    user.state = state || user.state;
    user.city = city || user.city;
    user.address = address || user.address;

    await user.save();

    res.json({ message: "Contact details updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// UPDATE GUARANTOR DETAILS
export const updateGuarantor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { guarantorDetails } = req.body; // Extract nextDetails from request

    if (!guarantorDetails) {
      return res
        .status(400)
        .json({ message: "guarantorDetails object is required" });
    }

    // Update the user record
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { guarantorDetails },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Next of guarantorDetails updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating guarantorDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//UPDATE KIN DETAILS
export const updateNextOfKin = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { nextDetails } = req.body; // Extract nextDetails from request

    if (!nextDetails) {
      return res
        .status(400)
        .json({ message: "nextDetails object is required" });
    }

    // Update the user record
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { nextDetails },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Next of Kin updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating next-of-kin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE FAMILY DETAILS

export const updateFamilyDetails = async (req, res) => {
  try {
    const { id, familyId } = req.params; // Ensure params are correctly received
    const updateData = req.body;

    console.log("Updating Family Member:", {
      userId: id,
      familyId,
      updateData,
    });

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const familyMemberIndex = user.familyDetails.findIndex(
      (member) => member._id.toString() === familyId
    );
    if (familyMemberIndex === -1) {
      return res.status(404).json({ message: "Family member not found" });
    }

    user.familyDetails[familyMemberIndex] = {
      ...user.familyDetails[familyMemberIndex],
      ...updateData,
    };

    await user.save();

    res.status(200).json({
      message: "Family member updated successfully",
      updatedFamilyMember: user.familyDetails[familyMemberIndex],
    });
  } catch (error) {
    console.error("Error updating family member:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// add family members
export const addFamilyMember = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, relationship, phone, address } = req.body;

    if (!name || !relationship || !phone || !address) {
      return res.status(400).json({
        message: "All fields (name, relationship, phone, address) are required",
      });
    }

    // Check if the familyDetails array already has 3 members
    if (user.familyDetails.length >= 3) {
      return res.status(400).json({
        message: "You can add up to 3 family members only.",
      });
    }

    // Create new family member object
    const newFamilyMember = { name, relationship, phone, address };

    // Push new family member to the existing array
    user.familyDetails.push(newFamilyMember);

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Family member added successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET EMPLOYEE ALL DATA
export const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const users = await User.find().sort({ startDate: -1 });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Convert Buffer to Base64 for each user with a profile picture
    const updatedUsers = users.map((user) => ({
      ...user._doc,
      profilePic: user.profilePic && user.profilePic.data
        ? `data:${user.profilePic.contentType};base64,${user.profilePic.data.toString("base64")}`
        : null, // If no profile pic, return null
    }));

    res.status(200).json({
      message: "Users retrieved successfully.",
      users: updatedUsers,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// GET ALL EMPLOYEE WITHOUT PROFILE PICTURE
export const getAllUsersWithoutProfilePic = async (req, res) => {
  try {
    // Fetch all users excluding the profilePic field
    const users = await User.find().select("-profilePic"); // Exclude profilePic field

    // Check if any users exist
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Respond with the user data without the profilePic
    res.status(200).json({
      message: "Users retrieved successfully without profile pics.",
      users, // Send the list of users without profile pics
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// NUMBER OF USERS(EMPLOYEESS)

export const noOfEmployees = async (req, res) => {
  try {
    // Query the database for all users with role 'user' (employees)
    const employeeCount = await User.countDocuments({ role: "user" });

    res.json({ employeesCount: employeeCount });
  } catch (error) {
    console.error("Error fetching employee count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// EDUCATION QUALIFICATION

// ✅ Get all users' education qualifications
export const getEducationQualifications = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName academicDetails");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Add education qualification to a user
export const createEducationQualification = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const {
      institute,
      location,
      course,
      department,
      startDate,
      endDate,
      description,
    } = req.body;

    if (
      !institute ||
      !course ||
      !location ||
      !description ||
      !department ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // // Check if the academicDetails array already has 3 members
    // if (user.academicDetails.length >= 3) {
    //   return res.status(400).json({
    //     message: "You can add up to 3 academicDetails.",
    //   });
    // }

    const newQualification = {
      institute,
      location,
      course,
      department,
      startDate,
      endDate,
      description,
    };
    user.educationDetails.academicRecords.push(newQualification);

    await user.save();
    res.status(201).json({ user, message: "successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding education record", error });
  }
};

// ✅ Update a specific education qualification
export const updateEducationQualification = async (req, res) => {
  try {
    const { id, recordId } = req.params;
    const updateData = req.body;

    console.log("Received Params:", req.params);
    console.log("Received Body:", req.body);

    console.log("Updating Education Qualification:", {
      userId: id,
      recordId,
      updateData,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "educationDetails.academicRecords._id": recordId },
      { $set: { "educationDetails.academicRecords.$": updateData } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User or education qualification not found" });
    }

    res.status(200).json({
      data: updatedUser.academicDetails.academicRecords,
      message: "Education qualification updated successfully!",
    });
  } catch (error) {
    console.error("Error updating education qualification:", error);
    res
      .status(500)
      .json({ message: "Error updating record", error: error.message });
  }
};

// update professional qualifications

export const updateProfessionalQualification = async (req, res) => {
  try {
    const { id, recordId } = req.params;
    const updateData = req.body;

    console.log("Updating Professional Qualification:", {
      userId: id,
      recordId,
      updateData,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "educationDetails.professionalDetails._id": recordId },
      { $set: { "educationDetails.professionalDetails.$": updateData } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User or professional qualification not found" });
    }

    res.status(200).json({
      data: updatedUser.academicDetails.professionalDetails,
      message: "Professional qualification updated successfully!",
    });
  } catch (error) {
    console.error("Error updating professional qualification:", error);
    res
      .status(500)
      .json({ message: "Error updating record", error: error.message });
  }
};

// ✅ Delete a specific education qualification
export const deleteEducationQualification = async (req, res) => {
  try {
    const { userId, qualificationId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.academicDetails = user.academicDetails.filter(
      (q) => q._id.toString() !== qualificationId
    );

    await user.save();
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting record", error });
  }
};

// professional details
export const createProfessionalQualification = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { title, institute, location, startDate, endDate, description } =
      req.body;

    if (
      !title ||
      !institute ||
      !location ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newProfessionalQualification = {
      title,
      institute,
      location,
      startDate,
      endDate,
      description,
    };

    user.educationDetails.professionalDetails.push(
      newProfessionalQualification
    );

    await user.save();
    res
      .status(201)
      .json({ user, message: "Professional qualification added successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding professional qualification", error });
  }
};
