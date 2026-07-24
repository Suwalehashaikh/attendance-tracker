export const validateSite = (req, res, next) => {
  const {
    siteName,
    city,
    state,
    address,
    latitude,
    longitude,
  } = req.body;

  if (
    !siteName ||
    !city ||
    !state ||
    !address ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Latitude Validation
  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({
      success: false,
      message: "Invalid latitude",
    });
  }

  // Longitude Validation
  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: "Invalid longitude",
    });
  }

  next();
};