import User from  "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register=async(req,res)=>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        await newUser.save()
        res.status(200).send("User has been created!")
        
    } catch (error) {
        console.log(error)
        
    }
}
export const login=async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        if (!user) return res.status(500).send("User is not found!")
        const check=await bcrypt.compare(req.body.password, user.password);
        if(!check) return res.status(500).send("password incorrect!")
        // res.status(200).json(user)
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,isAdmin,...otherDetails}=user._doc
        res
            .cookie("access_token",token,{httpOnly:true})
            .status(200)
            .json({...otherDetails})
        
    } catch (error) {
        console.log(error)
        
    }
}