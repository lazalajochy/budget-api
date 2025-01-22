import { model, Schema, Document } from "mongoose";
import argon2 from "argon2"


export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>
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

    const hash = await argon2.hash(user.password);
    user.password = hash;
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);

}

export default model<IUser>("Users", userSchema);