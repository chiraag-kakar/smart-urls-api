// import { UserRequest } from '../interfaces/user';
import { Request, Response, NextFunction } from 'express';
import { createUser, signToken, validateUser } from '../services/user.service';
import config from '../config/config';
import logging from '../config/logging';

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
        const user = await validateUser(req.body.email, req.body.password);
        // if (!user) {
        // }
        if (user) {
            const token = signToken(user._id);
            return res.status(201).send({ user: user, token: token });
        }
    } catch (e) {
        next(e);
    }
};