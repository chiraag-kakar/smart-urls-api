import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { LeanDocument, ObjectId } from 'mongoose';
import IUser from '../interfaces/user';
import User from '../models/user.model';
import config from '../config/config';

export const signToken = (id: ObjectId): string => {
    return jwt.sign({ id: id }, config.server.token.secret, {
        expiresIn:config.server.token.expireTime
    });
};

export const validatePassword = async (password: string, userPassword: IUser['password']): Promise<boolean> => await bcrypt.compare(password, userPassword);

export const createUser = async (userInput: IUser): Promise<Omit<LeanDocument<IUser>, '__v' | 'password'>> => {
    const user = new User(userInput);
    await user.save();
    return omit(user.toJSON(), ['password', '__v']);
};

export const validateUser = async (email: IUser['email'], password: IUser['password']): Promise<undefined | false | Omit<LeanDocument<IUser>, '__v' | 'password'>> => {
    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }
    if (await validatePassword(password, user.password)) {
        return omit(user.toJSON(), ['password', '__v']);
    }
};
