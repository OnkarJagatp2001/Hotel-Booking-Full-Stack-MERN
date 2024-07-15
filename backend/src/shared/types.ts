
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