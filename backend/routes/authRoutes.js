const express=require('express');
const router=express.Router();
const  {register,login}=require ('../controller/authController');
const authenticate = require("../middleware/authMiddleware");
const {validateRegister,validateLogin} = require("../middleware/authValidation");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/test", authenticate, (req, res) => {
    res.status(200).json({
        message: "Authentication successful",
        user: req.user
    });
});


module.exports = router;
