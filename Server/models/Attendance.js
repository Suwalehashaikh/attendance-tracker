import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    checkInLocation: {
      latitude: Number,
      longitude: Number,
    },

    checkOutLocation: {
      latitude: Number,
      longitude: Number,
    },

    workingHours: {
  type: Number,
  default: 0,
},

status: {
  type: String,
  enum: ["Present", "Absent", "Half Day"],
  default: "Present",
},

isLate: {
  type: Boolean,
  default: false,
},

remarks: {
  type: String,
  default: "",
},

deviceInfo: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;