export const validateLeave = (req, res, next) => {
  const { fromDate, toDate, reason } = req.body;

  // Required fields
  if (!fromDate || !toDate || !reason) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Reason validation
  if (reason.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: "Reason must be at least 5 characters long",
    });
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  // Invalid dates
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format",
    });
  }

  // From date should not be after to date
  if (from > to) {
    return res.status(400).json({
      success: false,
      message: "From date cannot be greater than To date",
    });
  }

  next();
};