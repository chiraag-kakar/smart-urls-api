import http, { request } from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction, response } from 'express';
import cors from 'cors';
import { errorMiddleware } from './utils/error';
// import path from 'path';

import logging from './config/logging';
import config from './config/config';

import * as dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.routes';
import urlRoutes from './routes/url.routes';
import health from './routes/health';

import db from './db/db';
import { any } from 'joi';
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const NAMESPACE = 'Server';

//setting up express app
const app = express();
app.use(cors({}));
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
app.use('/api/health', health);
app.use('/api/user', userRoutes);
app.use('/api/url', urlRoutes);

/** Error handling */

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
function req(
    req: any,
    Request: { new (input: RequestInfo, init?: RequestInit | undefined): globalThis.Request; prototype: globalThis.Request },
    res: any,
    Response: {
        new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): globalThis.Response;
        prototype: globalThis.Response;
        error(): globalThis.Response;
        redirect(url: string | URL, status?: number | undefined): globalThis.Response;
    }
): import('express-serve-static-core').RequestHandler<import('express-serve-static-core').ParamsDictionary, any, any, import('qs').ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}

function res(
    req: any,
    Request: { new (input: RequestInfo, init?: RequestInit | undefined): globalThis.Request; prototype: globalThis.Request },
    res: any,
    Response: {
        new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): globalThis.Response;
        prototype: globalThis.Response;
        error(): globalThis.Response;
        redirect(url: string | URL, status?: number | undefined): globalThis.Response;
    }
): import('express-serve-static-core').RequestHandler<import('express-serve-static-core').ParamsDictionary, any, any, import('qs').ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}
