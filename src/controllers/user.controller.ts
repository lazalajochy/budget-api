import { Request, Response } from "express"
import user, { IUser } from "../models/user";
import Jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
    return Jwt.sign({
        email: user.email,
        id: user.id
    }, config.jwtSecret as string)

}


export const signup = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: "Please, you should provide the email and the password!" })
        }
        const existingUser = await user.findOne({
            email: req.body.email
        })
        if (existingUser) {
            res.status(400).json({ msg: "Email is already taken" })
        }
        const newUser = await new user(req.body)
        await newUser.save();
        res.status(201).json({ data: newUser })
    } catch (error) {
        console.log(error)
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: "Please, you should provide the email and the password!" })
        }
        const existingUser = await user.findOne({ email: req.body.email });
        if (!existingUser) {
            res.status(404).json({ msge: "The user does not exist!" })
        }
        const matchPassword = await existingUser?.comparePassword(req.body.password);
        if (matchPassword) {
            res.status(201).json({ token: createToken(existingUser as IUser) })
        } else {
            res.status(400).json({ msg: "The  email or password is not valid" })
        }

    } catch (error) {
        console.log(error);

    }

}