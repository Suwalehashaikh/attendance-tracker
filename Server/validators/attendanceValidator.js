export const validateCheckIn = (req, res, next) => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: "Latitude and Longitude are required",
    });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({
      success: false,
      message: "Invalid latitude",
    });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: "Invalid longitude",
    });
  }

  next();
};

export const validateCheckOut = (req, res, next) => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: "Latitude and Longitude are required",
    });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({
      success: false,
      message: "Invalid latitude",
    });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: "Invalid longitude",
    });
  }

  next();
};