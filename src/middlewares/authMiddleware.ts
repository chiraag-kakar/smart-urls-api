import IUser, { UserRequest } from '../interfaces/user';
import User from '../models/user.model';

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config';
import logging from '../config/logging';
import * as dotenv from "dotenv";
dotenv.config();

const NAMESPACE = 'Auth';

export const auth = async (req: UserRequest, res: Response, next: NextFunction): Promise<undefined | Response> => {
    try {
        logging.info(NAMESPACE, 'Validating token');
        let token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please login to get access'
            });
        }

        interface JwtPayload {
            _id: string;
        }
        
        const { _id } = jwt.verify(token, config.server.token.secret) as JwtPayload;
        const user = await User.findOne({ _id, 'tokens.token': token });
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User no longer exists'
            });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).send({ error: 'Please Login!' });
    }
};
