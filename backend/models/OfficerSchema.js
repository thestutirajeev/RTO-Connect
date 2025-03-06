import mongoose from "mongoose";

const officerSchema = new mongoose.Schema(
  {
    password: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    aadhaar: {
      type: String,
      unique: true,
      required: true,
    },
    rtoOffice: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      enum: ["Clerk", "Inspector", "Officer", "Admin"],
      required: true,
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
