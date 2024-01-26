import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  //create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  //set jwt as http-only cookie, which is sent with every request
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: env.NODE_ENV !== "development", //have to have https
    sameSite: "strict",
    maxAge: 5 * 24 * 60 * 60 * 1000, //2 days
  });
};

export default generateToken;
