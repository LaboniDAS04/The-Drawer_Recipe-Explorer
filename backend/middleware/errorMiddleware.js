const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: err.errorCode || "SERVER_ERROR"
  });
};

module.exports = errorMiddleware;