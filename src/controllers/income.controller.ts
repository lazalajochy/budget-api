import { Request, Response } from "express";
import { IUser } from "../models/user";
import income from "../models/income";

export const addIncome = async (req: Request, res: Response) => {
    try {
        const user:IUser = req.user as IUser;
        const {salary, job_title} = req.body;
        const newIncome = new income({
            salary, 
            job_title,
            createdBy:user._id
        });
        await newIncome.save();
        res.status(201).json({msg: newIncome})
    } catch (error) {
        console.log(error);
        
    }
}

export const getIncomes = async (req: Request, res: Response) => {
    try {
        const user:IUser = req.user as IUser;
        const incomes = await income.find({createdBy: user._id});
        res.status(200).json({msg:incomes})
    } catch (error) {
        console.log(error)
        
    }
}