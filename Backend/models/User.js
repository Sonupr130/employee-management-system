import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Primary phone number is required"],
      match: [
        /^[0-9]{10,15}$/,
        "Please enter a valid phone number with 10-15 digits",
      ],
    },
    phone2: {
      type: String,
      match: [
        /^[0-9]{10,15}$/,
        "Please enter a valid phone number with 10-15 digits",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    department: {
      type: String,
    },
    startDate: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    category: {
      type: String,
      enum: ["Full-time", "Remote"],
      default: "Full-time",
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
    // Adding contact details fields
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    nextDetails: {
      kinName: { type: String,  },
      occupation: { type: String,  },
      phone: { type: String,  },
      relationship: { type: String,  },
      address: { type: String,  },
    },
    guarantorDetails: {
      name: { type: String,  },
      position: { type: String,  },
      phone: {
        type: String,
        // required: [true, "Primary phone number is required"],
        match: [
          /^[0-9]{10,15}$/,
          "Please enter a valid phone number with 10-15 digits",
        ],
      },
    },
    familyDetails: {
      type: [
        {
          name: { type: String, },
          relationship: { type: String, },
          phone: {
            type: String,
            // required: true,
            match: [
              /^[0-9]{10,15}$/,
              "Please enter a valid phone number with 10-15 digits",
            ],
          },
          address: { type: String, required: true },
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 3;
        },
        message: "You can add up to 3 family members only",
      },
    },


     // 🔥 Added Razorpay Contact & Fund Account fields
     razorpayContactId: {
      type: String,
      default: null, // Will be assigned when bank details are added
    },
    fundAccountId: {
      type: String,
      default: null, // Will be assigned when bank details are added
    },
    
    bankDetails: [{
      accountName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },  // Added IFSC code
      bankName: { type: String, required: true },
      accountType: {
        type: String,
        enum: ["Savings", "Current"],
        default: "Savings",
      },
    }],
    
    educationDetails: {
      academicRecords: [
        {
          institute: { type: String, required: true },
          course: { type: String, required: true },
          department: { type: String, required: true },
          location: { type: String, required: true },
          startDate: { type: String, required: true },
          endDate: { type: String, required: true },
          description: { type: String },
        },
      ],
      professionalDetails: [
        {
          title: { type: String, required: true },
          institute: { type: String, required: true },
          department: { type: String },
          startDate: { type: String, required: true },
          endDate: { type: String, required: true },
          description: { type: String },
        },
      ],
    },
  },

  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.userName = `${this.firstName} ${this.lastName}`;
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
export default mongoose.model("User", UserSchema);
