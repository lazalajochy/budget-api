import { model, Schema, Document } from "mongoose";


export interface IUser extends Document {
    userId: string;
}

const userSchema = new Schema({
    userId:{
        type: String,
        require: true,
        trim: true,
    }
});

export default model<IUser>("Users", userSchema);