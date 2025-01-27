"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        require: true,
        trim: true,
    }
});
exports.default = (0, mongoose_1.model)("Users", userSchema);
