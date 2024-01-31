import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide a email']
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('users', userSchema);

export default User;