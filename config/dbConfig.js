import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
        
    } catch (error) {
        
        throw new Error("Error connecting to database");
        
        
    }
}

export default dbConnect;