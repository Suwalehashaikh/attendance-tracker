import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import siteRoutes from "./routes/siteRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/sites", siteRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Construction Attendance API Running"
  });
});

export default app;