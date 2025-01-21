import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (password:string) => Promise<boolean>
}

const userSchema = new Schema({
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

userSchema.pre<IUser>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
});

userSchema.methods.comparePassword = async function(password:string): Promise<boolean>{
  return  await bcrypt.compare(password, this.password);

}

export default model<IUser>("Users", userSchema);