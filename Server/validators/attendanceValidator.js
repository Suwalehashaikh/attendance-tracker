export const validateCheckIn = (req, res, next) => {

    const { latitude, longitude } = req.body;

    if(latitude == null || longitude == null){

        return res.status(400).json({
            success:false,
            message:"Latitude and Longitude are required"
        });

    }

    next();

}
export const validateCheckOut = (req, res, next) => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: "Latitude and Longitude are required",
    });
  }

  next();
};