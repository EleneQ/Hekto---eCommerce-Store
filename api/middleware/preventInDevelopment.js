const blockInDevelopment = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return res.status(403).json({ message: "Forbidden action in development" });
  }
  next();
};

export default blockInDevelopment;
