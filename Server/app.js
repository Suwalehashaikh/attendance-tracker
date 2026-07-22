import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import siteRoutes from "./routes/siteRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"
import leaveRoutes from "./routes/leaveRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/sites", siteRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/leave", leaveRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Construction Attendance API Running"
  });
});

export default app;