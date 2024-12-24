import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl: string = process.env.DB_URL || ''

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data: any) => {
            console.log(`Database connected with ${data.connection.host}`)
        });
    } catch (err: any) {
        console.log(err.message)
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;