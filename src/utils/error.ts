import { NextFunction, Request, Response } from 'express';

export class ErrorHandler extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (req: Request, res: Response, next: NextFunction, error: ErrorHandler) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;

    return res.status(statusCode).send({
        message
    });
};
