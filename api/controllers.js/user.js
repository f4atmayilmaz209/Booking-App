import User from "../models/User.js";


export const createUser=async(req,res)=>{
    const newUser=new User(req.body)
    try {
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

export const updateUser=async(req,res)=>{
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

export const getUser=async(req,res)=>{
    try {

        const getUser=await User.findById(req.params.id)
        res.status(200).json(getUser)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const getAllUser=async(req,res)=>{
    try {
        const getAllUser=await User.find()
        res.status(200).json(getAllUser)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const deleteUser=async(req,res)=>{
    try {
        const deleteUser=await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}