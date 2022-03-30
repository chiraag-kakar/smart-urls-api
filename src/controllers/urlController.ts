// import { UserRequest } from '../interfaces/user';
import { Request, Response, NextFunction } from 'express';
import UrlModel from '../models/url.model';
import { UserRequest } from '../interfaces/user';
import { time } from 'console';

const NAMESPACE = 'Url Controller';

export async function quickCreate(req: Request, res: Response, next: NextFunction) {
    try {
        let url = await new UrlModel(req.body).save();
        return res.status(201).json({ shortUrl: url.shortUrl });
    } catch (error) {
        console.error('Error in quick create', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

export async function createShortUrl(req: UserRequest, res: Response, next: NextFunction) {
    try {
        console.log('aap andar aaye ki nhi');
        let url = await UrlModel.findOne({ longUrl: req.body.longUrl, user: req.user });
        console.log(url);
        if (url) {
            return res.status(400).json({
                error: 'You have already have a shortened version of this url!'
            });
        } else {
            url = await new UrlModel({ ...req.body, user: req.user }).save();
            return res.status(201).json(url);
        }
    } catch (error) {
        console.error('Error in short url creation', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

export async function redirectToUrl(req: Request, res: Response, next: NextFunction) {
    try {
        let url = await UrlModel.findOneAndUpdate({ shortUrl: req.params.shortUrl }, { $inc: { clicks: 1 } }, { new: true, runValidators: true });
        let currTime = new Date();
        if (!url) {
            return res.status(404).json({ error: 'URL not registered!' });
        } else if (currTime.getTime() >= url.expireAt.getTime()) {
            return res.status(404).json({ error: 'URL Expired!' });
        } else {
            return res.status(200).json({ longUrl: url.longUrl });
        }
    } catch (error) {
        console.error('Error in redirection', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

export async function getDashboard(req: UserRequest, res: Response, next: NextFunction) {
    try {
        let urls = await UrlModel.find({ user: req.user }).sort({ _id: -1 });
        return res.status(200).json(urls);
    } catch (error) {
        console.error('Error in retrieving dashboard', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

export async function getUrl(req: UserRequest, res: Response, next: NextFunction) {
    try {
        let url = await UrlModel.findOne({ longUrl: req.query.longUrl as string, user: req.user });
        if (!url) {
            return res.status(404).json({ error: 'Url not found!' });
        } else {
            return res.status(200).json(url);
        }
    } catch (error) {
        console.error('Error in retrieving url', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}

export async function deleteUrl(req: Request, res: Response, next: NextFunction) {
    try {
        await UrlModel.findByIdAndDelete(req.params.urlId);
        return res.status(204).send('Deleted');
    } catch (error) {
        console.error('Error in redirection', error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}
