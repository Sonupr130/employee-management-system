import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust to your User model location

const authenticateToken = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust based on your JWT_SECRET

    // Attach the decoded user data to the request object (req.user)
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to req.user for downstream use
    req.user = user;

    next(); // Call the next middleware or route handler
    // console.log("User fetched from DB:", user);

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};



// Function to get user data from token (can be used in the route handler)
const getUserDataFromToken = (user) => {
    if (!user) {
      throw new Error('No user found');
    }

    const fullName = `${user.firstName} ${user.lastName}`;
  
    return {
      name: fullName, // Adjust based on the fields you want to return
      email: user.email,
      jobTitle: user.jobTitle,
      jobDescription: user.jobDescription,
      profilePic: user.profilePic, 
      // Add any other user data fields you need
    };
  };
  
  export { authenticateToken, getUserDataFromToken };
