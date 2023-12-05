import express from 'express';
import {
    getMeHandler,
} from '../controllers/user.controller';
import { checkUser } from '../middleware/checkUser';
import { checkUserAuthorization } from '../middleware/checkUserAuthorization';

const router = express.Router();
router.use(checkUser, checkUserAuthorization);

router.get('/me', getMeHandler);

export default router;

