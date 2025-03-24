import mongoose from "mongoose";

const officerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      enum: ["officer"],
      default: "officer",
    },
    dob: {
      type: Date,
      //required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      //required: true,
    },
    phone: {
      type: String,
      unique: true,
      //required: true,
    },
    aadhaar: {
      type: String,
      unique: true,
      //required: true,
    },
    designation: {
      type: String,
      enum: ["Clerk", "Inspector", "Admin"],
      //required: true,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    assignedApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "License",
      },
    ],
  },
  { timestamps: true }
);

const Officer = mongoose.model("Officer", officerSchema);
export default Officer;
