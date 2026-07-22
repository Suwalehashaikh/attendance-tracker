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
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !designation ||
    !department ||
    !joiningDate ||
    !salary ||
    !address ||
    !emergencyContact ||
    !site
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  next();
};