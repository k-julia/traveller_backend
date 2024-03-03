import express from 'express';
import { checkUser } from '../middleware/checkUser';
import { checkUserAuthorization } from '../middleware/checkUserAuthorization';
import {getChatHandler} from "../controllers/chat.controller";

const router = express.Router();
router.use(checkUser, checkUserAuthorization);

router.get('/chat', getChatHandler);

export default router;