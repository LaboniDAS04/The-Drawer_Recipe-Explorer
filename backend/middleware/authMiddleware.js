const jwt = require('jsonwebtoken');
const authenticate=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message:"authentication token is required"
            })
        }
        const parts=authHeader.split(" ");
        if(parts.length!==2 || parts[0]!=="Bearer"){
            return res.status(401).json({
                message:"authentication header is invalid"
            })
        }
        const token=parts[1];
        const decoded= await jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(error){
        next(error)
    }
}




module.exports = authenticate;