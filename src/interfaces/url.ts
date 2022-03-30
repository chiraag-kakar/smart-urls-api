import { Document } from 'mongoose';
import IUser from './user';

export default interface IUrl extends Document {
    longUrl: string;
    shortUrl: string;
    user: IUser['_id'];
    clicks: number;
    createdAt: Date;
    expireAt: Date;
}
