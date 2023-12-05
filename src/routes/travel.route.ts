import express from 'express';
import {
    getAllUserTravelsHandler,
    createTravelHandler,
    getTravelHandler,
    createTravelDayPlanHandler,
    createTravelDayPlanItemHandler, createTravelItemToPickHandler
} from '../controllers/travel.controller';
import { checkUser } from '../middleware/checkUser';
import { checkUserAuthorization } from '../middleware/checkUserAuthorization';
import {validate} from "../middleware/validation";
import {
    createTravelDayPlanItemSchema,
    createTravelItemSchema,
    createTravelSchema,
    travelSchema
} from "../validation/travel.schema";

const router = express.Router();
router.use(checkUser, checkUserAuthorization);

router.get('/', getAllUserTravelsHandler);
router.post('/',  validate(createTravelSchema), createTravelHandler);
router.get('/:travelId', validate(travelSchema), getTravelHandler);
router.patch('/:travelId/dayPlan', validate(travelSchema), createTravelDayPlanHandler);
router.patch('/:travelId/dayPlan/:dayNumber', validate(createTravelDayPlanItemSchema), createTravelDayPlanItemHandler);
router.patch('/:travelId/itemToPick', validate(createTravelItemSchema), createTravelItemToPickHandler);

export default router;
