import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  //create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  //set jwt as http-only cookie, which is sent with every request
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", //true only in production because it needs https if true
    sameSite: "strict", //prevents attacks
    maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
  });
};

export default generateToken;
