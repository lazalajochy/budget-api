import { model, Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface ICategory extends Document{
    name: string; 
    description?: string;
    createdBy: IUser["_id"]
}

const categorySchema = new Schema({
    name:{
        type: String,
        trim:true
    },
    amount:{
        type: Number,
        trim:true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
});


export default model<ICategory>("Category", categorySchema);
