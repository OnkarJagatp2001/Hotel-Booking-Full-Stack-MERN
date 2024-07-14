import mongoose from "mongoose";

export type HotelType = {
    _id: String,
    userId: String,
    name: String,
    city: String,
    country: String,
    description: String,
    type: String,
    adultCount: Number,
    childCount: Number,
    facilities: String[],
    pricePerNight: Number,
    starRating: Number,
    imageUrls: String[],
    lastUpdated: Date;
}

const HotelSchema = {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: String, required: true },
    childCount: { type: String, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true }
}

const hotelSchema = new mongoose.Schema<HotelType>(HotelSchema)

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;