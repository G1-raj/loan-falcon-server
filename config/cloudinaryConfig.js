import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;


const cloudinaryConnect = () => {
    try {
        cloudinary.config(
            {
                cloud_name: cloudName,
                api_key: apiKey,
                api_secret: apiSecret
            }
        );

        console.log("Cloudinary connected successfully");

    } catch (error) {
        throw new Error("Error connecting to Cloudinary", error);
    }
}

export default cloudinaryConnect;