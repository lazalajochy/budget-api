import { model, Schema, Document } from "mongoose";
import { IUser } from "./user";


export interface IIncomes extends Document{
    createdBy: IUser["_id"];
    salary:Number;
    job_title:string;
};

const incomeSchema = new Schema({
    salary:{
        type:Number,
        require:true
    },
    job_title:{
        type:String
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
});


export default model<IIncomes>("Incomes", incomeSchema);