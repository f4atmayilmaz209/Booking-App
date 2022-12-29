import express from "express";
import { createRoom,updateRoomAvailability,updateRoom,getRoom,getAllRoom,deleteRoom} from "../controllers.js/room.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

router.put("/availability/:id",updateRoomAvailability)
//UPDATE
router.put("/:id",verifyAdmin,updateRoom)

//GET
router.get("/:id",getRoom)
//GETALL
router.get("/",getAllRoom)
//DELETE
router.delete("/:id/:hotelid",deleteRoom)
//CREATE
router.post("/:hotelid",verifyAdmin,createRoom)
export default router;