import express from "express";
import { countByCity,getHotelRooms, countByType, createHotel,deleteHotel,getAllHotel,getHotel,updateHotel,getAllHotelwithCity } from "../controllers.js/hotels.js";
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";


const router=express.Router();
router.get("/room/:id",getHotelRooms)
//CREATE
router.post("/",verifyAdmin,createHotel)

//GET
router.get("/find/:id",getHotel)
//DELETE
router.delete("/:id",deleteHotel)
//UPDATE
router.put("/:id",verifyAdmin,updateHotel)
//GETALL
router.get("/",getAllHotel)
router.get("/getAllHotelwithCity",getAllHotelwithCity)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)




export default router;