import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
const router = express.Router();
// Multer get the binary in the form and converted it into the objects
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

//  api/my-hotels/
const bodyValidator = [
    body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Hotel type is required'),
    body("facilities").notEmpty().isArray().withMessage('Facilities are required'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night and must be number'),

]
router.post("/",
    verifyToken,
    bodyValidator,
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {

        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;
            // 1. upload images to cloudinary
            // we will got the array of promises
            const uploadPromises = imageFiles.map(async (image) => {
                // converting the image into base64 string
                const b64 = Buffer.from(image.buffer).toString("base64");
                // let create the string that describes the image
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });
            // returns all the image urls
            const imageUrls = await Promise.all(uploadPromises);
            // 2. if upload was succcessful, add the URLs to the new hotels
            // add image urls returned from clodinary to req.body
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;
            // 3. save the new-hotel in our mongodb database
            const hotel = new Hotel(newHotel);
            await hotel.save();
            // 4. return a 201(status for record creation) status
            res.status(201).send(hotel);
        } catch (error) {
            console.log("Error creating hotels: ", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    })

export default router;