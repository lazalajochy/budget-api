 import { Request, Response } from "express";
 import { IUser } from "../models/user";
 import category, {ICategory} from "../models/category";

 export const addCategory = async (req: Request, res: Response) => {
    try {

        const user:IUser = req.user as IUser
        const {name, description} = req.body;

        const newCategory = new category({
            name,
            description,
            createdBy:user._id
        });

        await newCategory.save();
        res.status(201).json({msg: newCategory})
      
    } catch (error) {
        console.log(error)
        
    }
 }

 export const getCategories = async (req: Request, res: Response) => {
    try {
        const user: IUser = req.user as IUser;
        const categories = await category.find({createdBy: user._id});
        res.status(200).json({msg:categories})
    } catch (error) {
        console.log(error);
    }
 }