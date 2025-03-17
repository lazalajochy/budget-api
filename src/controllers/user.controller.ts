import { Request, Response } from "express"
import user, { IUser } from "../models/user";
import Jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
    return Jwt.sign({
        id: user.id,
    }, config.jwtSecret as string)
}
export const signin = async (req: Request, res: Response) => {
    try {
        if (!req.body.userId) {
            res.status(400).json({ msg: "Please, you should provide the user id data" })
        }
        const existingUser = await user.findOne({ userId: req.body.userId });
        if (!existingUser) {
            const newUser = await user.create({ userId: req.body.userId });
            res.status(201).json({ token: createToken(newUser as IUser) });
        }else{
            res.status(200).json({ token: createToken(existingUser as IUser) });
        }


    } catch (error) {
        console.log(error);

    }

}