import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const MONGOOSE_URI = process.env.MONGO_URI;
console.log(process.env.MONGO_URI);

const connectDB = async () =>{
    try {
        await mongoose.connect(MONGOOSE_URI);
        
        console.log("Connected to DB");
    } catch (error) {
        console.error("Connection failed to DB : "+ error);
        process.exit(0);
    }
}

export default connectDB;