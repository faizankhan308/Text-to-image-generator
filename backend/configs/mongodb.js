import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    })

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is missing. Please configure it in your Render environment settings.");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'ai-image'
    });

}

export default connectDB;