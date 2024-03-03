import express from 'express';
import {
    getAllUserTravelsHandler,
    createTravelHandler,
    getTravelHandler,
    createTravelDayPlanHandler,
    createTravelDayPlanItemHandler,
    createTravelItemToPickHandler,
    revertTravelItemIsPickedHandler,
    generateTravelHandler
} from '../controllers/travel.controller';
import { checkUser } from '../middleware/checkUser';
import { checkUserAuthorization } from '../middleware/checkUserAuthorization';
import {validate} from "../middleware/validation";
import {
    createTravelDayPlanItemSchema,
    createTravelItemSchema,
    createTravelSchema, generateTravelSchema,
    travelSchema, updateTravelItemSchema
} from "../validation/travel.schema";
import {generateTravelByRequest} from "../services/chat.service";

const router = express.Router();
router.use(checkUser, checkUserAuthorization);

router.get('/', getAllUserTravelsHandler);
router.post('/', validate(createTravelSchema), createTravelHandler);
router.post('/generate', validate(generateTravelSchema), generateTravelHandler)
router.get('/:travelId', validate(travelSchema), getTravelHandler);
router.patch('/:travelId/dayPlan', validate(travelSchema), createTravelDayPlanHandler);
router.patch('/:travelId/dayPlan/:dayNumber', validate(createTravelDayPlanItemSchema), createTravelDayPlanItemHandler);
router.post('/:travelId/itemToPick', validate(createTravelItemSchema), createTravelItemToPickHandler);
router.patch('/:travelId/itemToPick', validate(updateTravelItemSchema), revertTravelItemIsPickedHandler);

export default router;
