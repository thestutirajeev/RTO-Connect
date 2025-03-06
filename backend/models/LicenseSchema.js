import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    licenseType: {
      type: String,
      enum: ["LMV", "HMV", "Two-Wheeler", "Transport"],
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    licenseStatus: {
      type: String,
      enum: ["Active", "Suspended", "Cancelled"],
      default: "Active",
    },
    emergencyContact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    medicalCertificate: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const License = mongoose.model("License", licenseSchema);
export default License;
