import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
export type userType = {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }
})

//middleware for mongodb that saving the document check if the password has changed
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
const User = mongoose.model<userType>("User", userSchema);

export default User;