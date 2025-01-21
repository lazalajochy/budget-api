"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({
        email: user.email,
        id: user.id
    }, config_1.default.jwtSecret);
}
const signup = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: "Please, you should provide the email and the password!" });
        }
        const existingUser = await user_1.default.findOne({
            email: req.body.email
        });
        if (existingUser) {
            res.status(400).json({ msg: "Email is already taken" });
        }
        const newUser = await new user_1.default(req.body);
        await newUser.save();
        res.status(201).json({ data: newUser });
    }
    catch (error) {
        console.log(error);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: "Please, you should provide the email and the password!" });
        }
        const existingUser = await user_1.default.findOne({ email: req.body.email });
        if (!existingUser) {
            res.status(404).json({ msge: "The user does not exist!" });
        }
        const matchPassword = await existingUser?.comparePassword(req.body.password);
        if (matchPassword) {
            res.status(201).json({ token: createToken(existingUser) });
        }
        else {
            res.status(400).json({ msg: "The  email or password is not valid" });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.signin = signin;
