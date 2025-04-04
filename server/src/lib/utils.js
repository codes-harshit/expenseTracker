import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: true,
    secure: false,
  });

  return token;
};
