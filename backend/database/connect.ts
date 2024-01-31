import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const connect = async () => {
    await mongoose.connect(process.env.DATABASE_URL!)
}