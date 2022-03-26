import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import * as validator from 'validator';
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
        lowercase: true,
        validate(value:String) {
            // if (!validator.isEmail(value)) {
            //     throw new Error('Email is invalid');
            // }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value:String) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can not contain 'password'");
            }
        }
    },
});

userSchema.post<IUser>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
