import express from "express"
import dotenv from 'dotenv' 
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app=express()

//CONNECT MONGO DB!

mongoose.set("strictQuery", false);
const conn=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"booking",
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to Mongoo DB!")
    }).catch((err)=>{
        console.log(`DB Connection err:${err}`)

    });
};
//middlewares
app.use(cors())
app.use(cookieParser())

app.use(express.json())
// ROUTES
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)

//LİSTEN
app.listen(8800,()=>{
    conn()
    console.log("connected to backend")
})
