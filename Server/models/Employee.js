import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 👇 NEW FIELD
    role: {
      type: String,
      enum: ["employee", "supervisor"],
      default: "employee",
    },

    phone: String,

    designation: String,

    department: String,

    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },

    joiningDate: Date,

    salary: Number,

    address: String,

    emergencyContact: String,

    profileImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;