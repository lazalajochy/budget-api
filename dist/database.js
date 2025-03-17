"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const DB_URI = config_1.default.db.url;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const closeDB = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log("Database connection closed");
    }
    catch (error) {
        console.error("Error closing database connection:", error);
    }
};
exports.closeDB = closeDB;
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
