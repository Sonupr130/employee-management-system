import express from "express";
import {
  registerUser,
  loginUser,
  editProfile,
  getAllUsers,
  getUser,
  userProfile,
  logoutUser,
  bulkRegisterUsers,
  getAllUsersWithoutProfilePic,
  noOfEmployees,
  updateContactDetails,
  updateNextOfKin,
  updateGuarantor,
  addFamilyMember,
  updateFamilyDetails,
  getEducationQualifications,
  createEducationQualification,
  updateEducationQualification,
  deleteEducationQualification,
  createProfessionalQualification,
  updateProfessionalQualification,
} from "../controllers/userController.js";
import {
  getAllLeaveApplications,
  createLeaveApplication,
  updateLeaveApplicationStatus,
  getLeaveHistory,
  updateLeaveStatus,
  getApprovedLeaveApplications,
} from "../controllers/leaveController.js";
import { body } from "express-validator"; // For input validation
import { checkUserRole, getAdmin, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/adminController.js";
import {
  authenticateToken,
  getUserDataFromToken,
} from "../middleware/authenticateToken.js";
import {
  createNotification,
  getUnreadNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationController.js";

import {
  createMessageNotification,
  getUserMessageNotifications,
  // markMessageAsRead,
  deleteMessageNotification,
  markMessagesAsRead,
  getUnreadMessages,
  getAllMessages,
} from "../controllers/MessageContoller.js";
import {
  getAdminProfileImage,
  getProfileImage,
  uploadAdminProfileImage,
  uploadProfileImage,
} from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createKPI,
  deleteKPI,
  getAllKPIs,
  getKPIsByUserId,
  updateKPI,
} from "../controllers/kpiController.js";
import {
  addFinancialDetails,
  deleteFinancialDetails,
  getFinancialDetails,
  updateFinancialDetails,
} from "../controllers/financialController.js";
import { ForgotPassword, ResetPassword } from "../controllers/passwordController.js";
import { addJob, deleteJob, getJobs } from "../controllers/JobContoller.js";

// import { applyForJob } from "../controllers/applyForJobContoller.js";
import Job from "../models/JobSchema.js";

import { applyForJob, getCandidates, getCandidatesByJob, getJobByLink } from "../controllers/applyForJobContoller.js";
import mongoose from "mongoose";
import { getPayslipsByUser, processPayout } from "../controllers/paymentController.js";
import { getAllAppraisalScores, getUserAppraisalScores, requestAppraisal, updateAppraisal } from "../controllers/AppriasalController.js";
import { deleteTodo, getAllTodos, getPendingTodos, initiateTodo, updateTodoStatus } from "../controllers/Todocontroller.js";
import { calculateAtsScoreForCandidates } from "../controllers/atsController.js";


const router = express.Router();

//const storage = multer.memoryStorage();
//const upload = multer({ storage });

// ADMIN ROUTES
router.post("/admin/logout", logoutAdmin);
router.post("/check-role", checkUserRole);
router.post(
  "/user/register",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
); // Register BULK User
router.post(
  "/user/bulk-register",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  bulkRegisterUsers
); // Register User

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin); 
router.get("/admin", getAdmin);

// USER ROUTES
router.post("/user/login", loginUser); // User Login
router.post("/user/logout", logoutUser); // User Logout
router.get("/users", getAllUsers); // Get all users
router.get("/users/get-allusers", getAllUsersWithoutProfilePic);
router.get("/users/employee-count", noOfEmployees); // Get number of employees

router.put("/users/:userId", editProfile); // Update user profile by userId
router.get("/users/:id", getUser); // Get the user by id
// router.get("/users/user-profile", userProfile); // Get user profile
router.get("/profile-image/:userId", getProfileImage);
router.put(
  "/users/update-contact/:id",
  authenticateToken,
  updateContactDetails
); // Update logged-in user's contact details

// ⭐ [ FAMILY ROUTES ]

router.put("/users/update-next-of-kin/:id", authenticateToken, updateNextOfKin);
router.put("/users/update-guarantor/:id", authenticateToken, updateGuarantor);
router.post("/users/add/", authenticateToken, addFamilyMember); // Add a new family member
router.put(
  "/users/update/:id/family/:familyId",
  authenticateToken,
  updateFamilyDetails
); // Update family details

// ⭐ [ EDUCATION QUALIFICATION ROUTES ]

router.get("/", getEducationQualifications); // Get all education qualifications
router.post("/users/add-academic/:id", authenticateToken, createEducationQualification); // Add education qualification (User ID needed in request body)
router.post("/users/add-professional/:id", authenticateToken, createProfessionalQualification); // Add education qualification (User ID needed in request body)
router.put("/users/update/:id/academic/:recordId", authenticateToken, updateEducationQualification); // Update a specific education qualification
router.put("/users/update/:id/professional/:recordId", authenticateToken, updateProfessionalQualification); // Update a specific education qualification
router.delete("/:userId/:qualificationId", deleteEducationQualification); // Delete a specific education qualification



// Define routes
router.post(
  "/upload-profile/:userId",
  authenticateToken,
  upload.single("file"),
  uploadProfileImage
);


// uploadAdminProfileImage
router.post(
  "/admin/upload-profile/:adminId",
  // authenticateToken,
  upload.single("file"),
  uploadAdminProfileImage
);
router.get("/admin/profile-image/:adminId", getAdminProfileImage);


// LEAVE APPLICATION ROUTES
router.get("/leave-applications", getAllLeaveApplications); // Route to get all leave applications (Admin side)
router.post(
  "/create-leave-application",
  authenticateToken,
  createLeaveApplication
); // Route to create a new leave application (User side)
// router.put('/leave-applications/:id', updateLeaveApplicationStatus);  // Route to approve/decline leave application (Admin side)
router.patch("/leave-applications/:id", updateLeaveStatus); // Route to approve/decline leave application
router.get("/leave-applications/approved", getApprovedLeaveApplications); // Retrive only the approved leave applications

router.get("/get-leave-history", authenticateToken, getLeaveHistory);

router.get("/get-user-data", authenticateToken, async (req, res) => {
  try {
    // You can use the authenticated user from req.user (which is set in the middleware)
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Concatenate firstName and lastName to create the full name
    const userData = {
      _id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`, // Concatenate firstName and lastName
      email: user.email, // You can add any other fields you need here
      jobTitle: user.jobTitle,
      department: user.department,
      category: user.category,
      gender: user.gender,
      phone: user.phone,
      phone2: user.phone2,
      state: user.state,
      city: user.city,
      address: user.address,
      profilePic: user.profilePic?.data
        ? `data:${user.profilePic.contentType};base64,${user.profilePic.data.toString("base64")}`
        : null,
      nextDetails: user.nextDetails
        ? {
            kinName: user.nextDetails.kinName || "",
            occupation: user.nextDetails.occupation || "",
            phone: user.nextDetails.phone || "",
            relationship: user.nextDetails.relationship || "",
            address: user.nextDetails.address || "",
          }
        : null,
      guarantorDetails: user.guarantorDetails
        ? {
            name: user.guarantorDetails.name || "",
            position: user.guarantorDetails.position || "",
            phone: user.guarantorDetails.phone || "",
          }
        : null,

      familyDetails: Array.isArray(user.familyDetails)
        ? user.familyDetails.map((familyMember) => ({
            _id: familyMember._id?.toString() || "", // ✅ Ensure _id is included and converted to string
            name: familyMember.name || "",
            relationship: familyMember.relationship || "",
            phone: familyMember.phone || "",
            address: familyMember.address || "",
          }))
        : [],
      bankDetails: Array.isArray(user.bankDetails)
        ? user.bankDetails.map((user) => ({
            accountName: user.accountName || "",
            accountNumber: user.accountNumber || "",
            ifscCode: user.ifscCode || "",
            bankName: user.bankName || "",
            accountType: user.accountType || "",
          }))
        : null,
        educationDetails: {
          academicRecords: Array.isArray(user.educationDetails?.academicRecords)
            ? user.educationDetails.academicRecords.map((record) => ({
                _id: record._id || "",
                institute: record.institute || "",
                course: record.course || "",
                department: record.department || "",
                location: record.location || "",
                startDate: record.startDate || "",
                endDate: record.endDate || "",
                description: record.description || "",
              }))
            : [],
          professionalDetails: Array.isArray(user.educationDetails?.professionalDetails)
            ? user.educationDetails.professionalDetails.map((record) => ({
                _id: record._id || "",
                title: record.title || "",
                institute: record.institute || "",
                department: record.department || "",
                startDate: record.startDate || "",
                endDate: record.endDate || "",
                description: record.description || "",
              }))
            : [],
        },
    };

    res.json(userData);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res
      .status(500)
      .json({ message: "Error retrieving user data", error: error.message });
  }
});

// FINANICAL DETAILS
router.get("/", authenticateToken, getFinancialDetails);
router.post("/users/add-bankinfo", authenticateToken, addFinancialDetails);
router.put(
  "/users/add-bankinfo/update/:id",
  authenticateToken,
  updateFinancialDetails
);
router.delete(
  "/users/add-bankinfo/delete",
  authenticateToken,
  deleteFinancialDetails
);

// NOTIFICATIONS

router.post("/notifications", createNotification); // Create a notification
router.get("/notifications/:userId", getUnreadNotifications); // Fetch unread notifications for a user
router.put("/notifications/read/:userId", markNotificationsAsRead); // Mark notifications as read

// Message Notification


router.post("/messages", createMessageNotification); // 📌 Create a new message notification
router.get("/messages/:userId", getUserMessageNotifications); // 📌 Get all messages for a user
router.get("/messagess/:userId", getAllMessages); // 📌 Get all messages for a user
router.put("/messages/read/:userId", markMessagesAsRead); // 📌 Mark a specific message as read

router.delete("/messages/:messageId", deleteMessageNotification);  // 📌 Delete a specific message notification (fixed route path)
router.get("/messagess/:userId",getUnreadMessages)

// KPI ROUTES

router.post("/kpi/create", createKPI); // Route to create a KPI
router.get("/kpi/user", getAllKPIs); // Route to get all KPIs for a user
router.get("/kpi/usercompleted/:userId",getKPIsByUserId);


router.put("/kpi/update/:kpiId", updateKPI); // Route to update a KPI
router.delete("/kpi/delete/:kpiId", deleteKPI); // Route to delete a KPI

// todos Routes

router.post("/initiate", initiateTodo);
router.get("/todo/user/:userId", getAllTodos);
router.delete("/:id", deleteTodo);
router.put("/todo/update/:id", updateTodoStatus);
router.get("/todos/pending/:userId", getPendingTodos);


// appraisal 
router.post("/request-appraisal", requestAppraisal);

// Admin updates appraisal score
router.put("/update-appraisal/:id", updateAppraisal);

// Get user appraisal scores for chart
router.get("/user-appraisal-scores/:userId", getUserAppraisalScores);

router.get("/get-all-appraisal-scores", getAllAppraisalScores);





// payroll razor pay

router.post('/payroll/payout', async (req, res) => {
  const { employeeId } = req.body;
  const employee = await User.findById(employeeId);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  try {
    const payoutResponse = await initiatePayout(employee);
    res.status(200).json(payoutResponse);
  } catch (error) {
    console.error("Payroll Error: ", error);
    res.status(500).json({ error: error.message });
  }
});


// forgot password route

// POST route for Forgot Password
router.post('/user/forgot-password', ForgotPassword);
router.post('/user/reset-password/:resetPasswordToken', ResetPassword);



// jobs route
router.get('/getall', getJobs);
router.post('/addjob', addJob);
router.delete('/delete/job/:id', deleteJob);


// job apply
router.post('/jobs/apply/:jobId', applyForJob);
router.get('/candidates', getCandidates);
router.get('/candidates/:jobId', getCandidatesByJob);  // Get candidates by job ID

router.post("/calculate-ats", calculateAtsScoreForCandidates);




router.get("/job/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Job.findById(jobId); // Query using _id

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job details", error });
  }
});

router.get("/api/payslips/:userId", getPayslipsByUser);
router.post("/api/payouts", processPayout);



export default router;
