import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IUrl from '../interfaces/url';
import shortid from 'shortid';
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
});

urlSchema.pre<IUrl>('save', function (next) {
    if (this.isNew) {
        this.shortUrl = shortid.generate();
    }
    return next();
});

urlSchema.post<IUrl>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

const UrlModel = mongoose.model<IUrl>('Url', urlSchema);
export default UrlModel;
