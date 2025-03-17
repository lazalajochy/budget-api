import mongoose from "mongoose";
import config from "./config/config";

const DB_URI = config.db.url as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error closing database connection:", error);
    }
};

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
