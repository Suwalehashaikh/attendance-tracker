export const validateEmployee = (req, res, next) => {
  const {
    name,
    email,
    phone,
    designation,
    department,
    joiningDate,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !designation ||
    !department ||
    !joiningDate
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  next();
};