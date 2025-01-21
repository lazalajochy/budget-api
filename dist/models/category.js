"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});
exports.default = (0, mongoose_1.model)("Category", categorySchema);
