// import { UserRequest } from '../interfaces/user';
import { Request, Response, NextFunction } from 'express';
import { createUser, signToken, validateUser } from '../services/user.service';
import config from '../config/config';
import logging from '../config/logging';
import User from '../models/user.model';
const NAMESPACE = 'User Controller';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const user = await createUser(req.body);
        // if (!user) {
        //   throw new ValidationError(
        //     "Could not create user, check email passowrd again.",
        //     403
        //   );
        // }
        return res.status(201).send({ user: user });
    } catch (e) {
        next(e);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        console.log('called');
        const user = await validateUser(req.body.email, req.body.password);
        console.log(user);
        // if (!user) {
        // }
        if (user) {
            const token = signToken(user._id);
            return res.status(201).send({ user: user, token: token });
        }
    } catch (e) {
        console.log('error called');
        console.log(e);
        next(e);
    }
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
