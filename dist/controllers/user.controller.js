"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
    }, config_1.default.jwtSecret);
}
const signin = async (req, res) => {
    try {
        if (!req.body.userId) {
            res.status(400).json({ msg: "Please, you should provide the user id data" });
        }
        const existingUser = await user_1.default.findOne({ userId: req.body.userId });
        if (!existingUser) {
            const newUser = await user_1.default.create({ userId: req.body.userId });
            res.status(201).json({ token: createToken(newUser) });
        }
        else {
            res.status(200).json({ token: createToken(existingUser) });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.signin = signin;
