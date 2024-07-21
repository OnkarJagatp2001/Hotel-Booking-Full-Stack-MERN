import express,{Request,Response} from 'express';
import Hotel from '../models/hotel';
const router  = express.Router();

// /api/hotels/search?
router.get('/search',async (req:Request,res:Response)=>{
    try{
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find().skip(skip).limit(pageSize);
    }catch(error){
        console.log("routes/hotel.ts  9 error: ",error);
        res.status(500).json({message:"Something Went Wrong"});
    }
})