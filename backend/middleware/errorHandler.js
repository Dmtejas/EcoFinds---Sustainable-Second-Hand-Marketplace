function errorHandler(err, req, res, next) {
  console.error(err); // log for debugging

  let statusCode;
  let message = err.message || "Something went wrong";

  switch (err.type) {
    case "BAD_REQUEST":
      statusCode = process.env.STATUS_BAD_REQUEST;
      break;
    case "UNAUTHORIZED":
      statusCode = process.env.STATUS_UNAUTHORIZED;
      break;
    case "FORBIDDEN":
      statusCode = process.env.STATUS_FORBIDDEN;
      break;
    case "NOT_FOUND":
      statusCode = process.env.STATUS_NOT_FOUND;
      break;
    case "CONFLICT":
      statusCode = process.env.STATUS_CONFLICT;
      break;
    default:
      statusCode = process.env.STATUS_INTERNAL_ERROR;
  }

  res.status(statusCode).json({
    error: {
      type: err.type || "INTERNAL_ERROR",
      message,
      statusCode
    }
  });
}

module.exports = errorHandler;