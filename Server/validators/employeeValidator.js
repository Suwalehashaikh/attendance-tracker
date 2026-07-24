export const validateEmployee = (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    designation,
    department,
    joiningDate,
    salary,
    address,
    emergencyContact,
    site,
    role,
  } = req.body;

  // Required Fields
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !designation ||
    !department ||
    !joiningDate ||
    salary === undefined ||
    !address ||
    !emergencyContact ||
    !site
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  // Password Validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  // Phone Validation
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits",
    });
  }

  // Emergency Contact Validation
  if (!phoneRegex.test(emergencyContact)) {
    return res.status(400).json({
      success: false,
      message: "Emergency contact must be 10 digits",
    });
  }

  // Salary Validation
  if (salary < 0) {
    return res.status(400).json({
      success: false,
      message: "Salary cannot be negative",
    });
  }

  // Role Validation (Optional)
  if (role && !["employee", "supervisor"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be either 'employee' or 'supervisor'",
    });
  }

  next();
};