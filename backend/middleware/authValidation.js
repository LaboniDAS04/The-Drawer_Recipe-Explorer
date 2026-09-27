const validateRegister = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      field: "name",
      message: "name is required",
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      field: "email",
      message: "email is required",
    });
  }
  if (!req.body.email.includes("@")) {
    return res.status(400).json({
      field: "email",
      message: "Please provide a valid email address",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      field: "password",
      message: "Password is required",
    });
  }
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  if (!passwordPattern.test(req.body.password)) {
    return res.status(400).json({
      field:"password",
      message: "Password must include a capital letter, a number, and a special character."
    })
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      field: "email",
      message: "Email is required",
    });
  }
   if (!req.body.email.includes("@")) {
    return res.status(400).json({
      field: "email",
      message: "Please provide a valid email address",
    });
  }
  if (!password) {
    return res.status(400).json({
      field: "password",
      message: "password is required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
