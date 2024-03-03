import { NextFunction, Request, Response } from 'express';
import {getChatResponse} from "../services/chat.service";

export const getChatHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = getChatResponse();
        res.status(200).json({
            status: 'success',
            data: {
                response,
            },
        });
    } catch (err: any) {
        next(err);
    }
};