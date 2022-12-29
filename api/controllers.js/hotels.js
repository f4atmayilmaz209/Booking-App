import Hotel from "../models/Hotels.js";
import Room from "../models/Room.js"

export const createHotel=async(req,res)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

export const updateHotel=async(req,res)=>{
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

export const getHotel=async(req,res)=>{
    try {

        const getHotel=await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
        
    } catch (error) {
        console.log("bebe")
        res.status(500).json(error)
        
    }
    
}
export const getAllHotel=async(req,res)=>{
    try {

       
        const getAllHotel=await Hotel.find({featured:req.query.featured.toString()}).limit(req.query.limit)
        res.status(200).json(getAllHotel)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const getAllHotelwithCity=async(req,res)=>{
    try {

        const getAllHotel=await Hotel.find({$and:[{city:req.query.city},{cheapestPrice:{ $gt :  req.query.min,$lt:req.query.max}}]})
        res.status(200).json(getAllHotel)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const deleteHotel=async(req,res)=>{
    try {
        const deleteHotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}
export const countByCity=async(req,res)=>{
    const cities=req.query.cities.split(",")

    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)       
    } catch (error) {
        res.status(500).json(error)       
    }
}

export const countByType=async(req,res)=>{

    try {
        const hotelCount=await Hotel.countDocuments({type:"hotel"})
        const apartmentCount=await Hotel.countDocuments({type:"apartment"})
        const resortCount=await Hotel.countDocuments({type:"resort"})
        const villaCount=await Hotel.countDocuments({type:"villa"})
        const cabinCount=await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabins",count:cabinCount},
        ])       
    } catch (error) {
        res.status(500).json(error)       
    }
}


export const getHotelRooms=async(req,res)=>{
    try {
        const hotel=await Hotel.findById(req.params.id)
        const list=await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }
        ))
        res.status(200).json(list)
        
    } catch (error) {
        res.send(error)
        
    }
}