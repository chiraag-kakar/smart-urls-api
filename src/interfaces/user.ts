import { Document } from 'mongoose';
import { Request } from 'express';

export default interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export interface UserRequest extends Request {
    user?: IUser;
}
