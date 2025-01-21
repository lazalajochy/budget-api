import mongoose from "mongoose";
import config from "./config/config"

mongoose.connect(config.db.url as string);

const  connection = mongoose.connection;

connection.once("open", () => {
    console.log("The connection is done...!")
});

connection.on("error", err => {
    console.log(err.message);
    process.exit(0);
});