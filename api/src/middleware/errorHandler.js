//if no other middleware handled the request
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);

  next(error);
};

//override the default express error handler
const errorHandler = (err, req, res, next) => {
  if (!(err instanceof Error)) return;

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //type assersion for mongoose cast/bad objectid error
  const castError = err;

  if (castError.name === "CastError" && castError.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export { notFound, errorHandler };
