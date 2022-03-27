import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import logging from '../config/logging';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    }
});

userSchema.post<IUser>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
