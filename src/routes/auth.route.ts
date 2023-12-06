import express from 'express';
import {logoutHandler, loginHandler, registerHandler, refreshAccessTokenHandler} from '../controllers/auth.controller';
import { validate } from '../middleware/validation';
import { checkUser } from "../middleware/checkUser";
import { checkUserAuthorization } from "../middleware/checkUserAuthorization";
import { createUserSchema, loginUserSchema } from '../validation/user.schema';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerHandler);

router.post('/login', validate(loginUserSchema), loginHandler);

router.get('/logout', checkUser, checkUserAuthorization, logoutHandler);

router.get("/refresh", refreshAccessTokenHandler);

export default router;
