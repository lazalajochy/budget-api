"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    }
});
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    const hash = await argon2_1.default.hash(user.password);
    user.password = hash;
});
userSchema.methods.comparePassword = async function (password) {
    return await argon2_1.default.verify(this.password, password);
};
exports.default = (0, mongoose_1.model)("Users", userSchema);
