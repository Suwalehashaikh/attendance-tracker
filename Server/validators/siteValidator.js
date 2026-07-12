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

  next();
};