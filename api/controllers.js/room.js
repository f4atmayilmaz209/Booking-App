import Room from "../models/Room.js";
import Hotel from "../models/Hotels.js";

export const createRoom=async(req,res,next)=>{

    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body)

    try {
        const savedRoom=await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
            
        } catch (error) {
            res.send(error)
        }
        res.status(200).json(savedRoom);
        
    } catch (error) {
        res.send(error)
        
    }

}


export const updateRoom=async(req,res)=>{
    try {
        const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateRoom)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

export const getRoom=async(req,res)=>{
    try {

        const getRoom=await Room.findById(req.params.id)
        res.status(200).json(getRoom)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const getAllRoom=async(req,res)=>{
    try {
        const getAllRoom=await Room.find()
        res.status(200).json(getAllRoom)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const deleteRoom=async(req,res)=>{
    const hotelId=req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
            
        } catch (error) {
            res.send(error)
        } 
        res.send("room deleted")

        
    } catch (error) {
        res.send(error)
        
    }
    
}
export const updateRoomAvailability=async(req,res)=>{
    try {
        await Room.updateOne({"roomNumbers._id":req.params.id},{
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            },
        })
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}