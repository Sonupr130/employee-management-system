import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Controller for handling signup
export const signupController = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

  // Validation: Check if all fields are provided
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Validation: Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  try {
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    });

    // Save the new user to the database
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
