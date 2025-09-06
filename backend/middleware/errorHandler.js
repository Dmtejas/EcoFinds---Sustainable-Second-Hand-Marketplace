// middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err); // log for debugging

  let statusCode;
  let message = err.message || "Something went wrong";

  switch (err.type) {
    case "BAD_REQUEST":
      statusCode = 400; // Bad Request
      break;
    case "UNAUTHORIZED":
      statusCode = 401; // Unauthorized
      break;
    case "FORBIDDEN":
      statusCode = 403; // Forbidden
      break;
    case "NOT_FOUND":
      statusCode = 404; // Not Found
      break;
    case "CONFLICT":
      statusCode = 409; // Conflict
      break;
    default:
      statusCode = 500; // Internal Server Error
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


