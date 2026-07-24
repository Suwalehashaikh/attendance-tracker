import Employee from "../models/Employee.js";
import Site from "../models/Site.js";
import bcrypt from "bcrypt";

// ================= CREATE EMPLOYEE =================

export const createEmployee = async (employeeData) => {
  // Duplicate Email Check
  const existingEmployee = await Employee.findOne({
    email: employeeData.email,
  });

  if (existingEmployee) {
    throw new Error("Employee with this email already exists");
  }

  // Site Validation
  if (employeeData.site) {
    const site = await Site.findById(employeeData.site);

    if (!site) {
      throw new Error("Selected site does not exist");
    }
  }

  // Generate Employee ID
  const count = await Employee.countDocuments();

  const employeeId = `ATS-${new Date().getFullYear()}-${String(
    count + 1
  ).padStart(4, "0")}`;

  // Hash Password
  const hashedPassword = await bcrypt.hash(
    employeeData.password,
    10
  );

  // Create Employee
  const employee = await Employee.create({
    employeeId,
    ...employeeData,
    role: employeeData.role || "employee",
    password: hashedPassword,
  });

  return await Employee.findById(employee._id)
    .select("-password")
    .populate("site", "siteName siteCode city");
};

// ================= GET ALL EMPLOYEES =================

export const getEmployees = async (query) => {
  console.log("Query =>", query);

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search?.trim();

  console.log("Search =>", search);

  let filter = {};

  if (search) {
    filter = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          employeeId: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };
  }

  console.log("Filter =>", JSON.stringify(filter, null, 2));

  const totalEmployees = await Employee.countDocuments(filter);

  const employees = await Employee.find(filter)
    .select("-password")
    .populate("site", "siteName siteCode city")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  console.log("Matched Employees =>", employees.length);

  return {
    employees,
    totalEmployees,
    currentPage: page,
    totalPages: Math.ceil(totalEmployees / limit),
  };
};

// ================= GET EMPLOYEE BY ID =================

export const getEmployeeById = async (id) => {
  return await Employee.findById(id)
    .select("-password")
    .populate("site", "siteName siteCode city");
};

// ================= UPDATE EMPLOYEE =================

export const updateEmployee = async (id, employeeData) => {
  // Site Validation
  if (employeeData.site) {
    const site = await Site.findById(employeeData.site);

    if (!site) {
      throw new Error("Selected site does not exist");
    }
  }

  // Hash password if updating password
  if (employeeData.password) {
    employeeData.password = await bcrypt.hash(
      employeeData.password,
      10
    );
  }

  const employee = await Employee.findByIdAndUpdate(
    id,
    employeeData,
    {
      new: true,
      runValidators: true,
    }
  )
    .select("-password")
    .populate("site", "siteName siteCode city");

  return employee;
};

// ================= DELETE EMPLOYEE =================

export const deleteEmployee = async (employeeId) => {
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new Error("Employee not found");
  }

  await Employee.findByIdAndDelete(employeeId);

  return employee;
};