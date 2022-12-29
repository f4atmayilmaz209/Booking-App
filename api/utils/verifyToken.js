import jwt from "jsonwebtoken";



export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(500).json("token is not available")
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return res.status(403).send("token is not valid")
        req.user=user
        next()
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.send("You are not authorized!")
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return res.send("You are admin")
        }
    })
}