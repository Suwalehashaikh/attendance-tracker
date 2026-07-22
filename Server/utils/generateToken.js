import jwt from "jsonwebtoken";

const generateToken = (id, role, type = "admin") => {
  return jwt.sign(
    {
      id,
      role,
      type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;