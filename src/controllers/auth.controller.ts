import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../validation/user.schema';
import {createUser, deleteToken, findUser, signToken} from '../services/user.service';
import AppError from '../utils/appError';

export const excludedFields = ['password'];

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};

export const registerHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await createUser({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        // Duplicates handling
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already exist',
            });
        }
        next(err);
    }
};

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUser({ email: req.body.email });

        if (
            !user ||
            !(await user.comparePasswords(user.password, req.body.password))
        ) {
            return next(new AppError('Invalid email or password', 401));
        }

        const accessToken = await signToken(user);

        res.cookie('accessToken', accessToken.access_token, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        res.status(200).json({
            status: 'success',
            accessToken,
        });
    } catch (err: any) {
        next(err);
    }
};

export const logoutHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        await deleteToken(user._id.toString());
        logout(res);
        res.status(200).json({ status: "success" });
    } catch (err: any) {
        next(err);
    }
};

const logout = (res: Response) => {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.cookie("logged_in", "", { maxAge: 1 });
};
