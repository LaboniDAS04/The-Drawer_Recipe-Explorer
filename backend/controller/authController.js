const User = require("../model/user");
const {hashPassword,comparePassword}=require('../utils/password')
const generateToken=require('../utils/token');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        field: "email",
        message: "email already exists"
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "user registered successfully",
      User: {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "sign up required",
      });
    }
    const isPasswordCorrect = await comparePassword(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        field:["email","password"],
        message: "invalid email or password",
      });
    }
    const token=await generateToken(existingUser);
    res.status(200).json({
      message: "login successful",
      token: token,
      role: existingUser.role
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
