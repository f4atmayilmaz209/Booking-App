import express from "express";
import { createUser,deleteUser,getAllUser,getUser,updateUser } from "../controllers.js/user.js";
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user you are logged in")

// })
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user ,you are logged in and you can delete you account!")

// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin ,you are logged in and you can delete all account!")

// })

//UPDATE
router.put("/:id",verifyUser,updateUser)
//GET
router.get("/:id",verifyUser,getUser)
//GETALL
router.get("/",verifyUser,getAllUser)
//DELETE
router.delete("/:id",verifyAdmin,deleteUser)

export default router;