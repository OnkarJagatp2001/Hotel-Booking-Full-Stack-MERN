import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth'
import cookieParser from "cookie-parser";
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
//bellow is just for checking whether both the databse working fine i.e Booking.com and e2e test1
// .then(() => {
//     console.log("Connected to the database: ", process.env.MONGODB_CONNECTION_STRING)
// })


const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

console.log(process.env.FRONTEND_URL);

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        // methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods
        // allowedHeaders: ['Content-Type', 'Authorization'], // specify allowed headers

    }
));

//bundled the fronted code in backend folder
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'))
})

app.listen(7000, () => {
    console.log("Server running on localhost: 7000");
})

// 1.32 min