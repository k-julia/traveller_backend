import * as fs from "fs";

require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import travelRouter from './routes/travel.route';
import * as https from "https";

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(
    cors({
        origin: config.get<string>('origin'),
        credentials: true,
    })
);

app.use('/traveller/users', userRouter);
app.use('/traveller/auth', authRouter);
app.use('/traveller/travels', travelRouter);

app.get(
    "/traveller/healthChecker",
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            status: "success",
            message: "Traveller!!!",
        });
    }
);

// For unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// App error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const port = config.get<number>('port');

const options = {
    key: fs.readFileSync('C:/Users/juliet/IdeaProjects/openssl-0.9.8k_X64/bin/server.key'),
    cert: fs.readFileSync('C:/Users/juliet/IdeaProjects/openssl-0.9.8k_X64/bin/server.crt'),
}

https.createServer(options, app)
    .listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectDB();
});
