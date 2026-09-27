const jwt= require('jsonwebtoken');
const generateToken=async(user)=>{
    const payload={
        userId: user._id,
        userRole: user.role
    }
    const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}

module.exports=generateToken;