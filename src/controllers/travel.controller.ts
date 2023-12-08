import { NextFunction, Request, Response } from 'express';
import {
    createTravel,
    findAllTravelsForUser,
    findTravelById,
    updateTravel
} from '../services/travel.service';
import AppError from "../utils/appError";
import {DayPlan, ItemToPick, PlanItem} from "../models/travel.model";
import {
    CreateTravelDayPlanItemInput,
    CreateTravelItemInput, TravelInput, UpdateTravelItemInput
} from "../validation/travel.schema";
export const getAllUserTravelsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const travels = await findAllTravelsForUser(user._id);
        res.status(200).json({
            status: 'success',
            data: {
                travels,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createTravelHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const travel = await createTravel({
            name: req.body.name,
            userId: user._id,
        });
        res.status(200).json({
            status: 'success',
            data: {
                travel,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getTravelHandler = async (
    req: Request<TravelInput["params"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const travel = await findTravelById(req.params.travelId);

        if (!travel) {
            return next(new AppError("Travel with that ID not found", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                travel,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createTravelDayPlanHandler = async (
    req: Request<TravelInput["params"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const travel = await findTravelById(req.params.travelId);

        if (!travel) {
            return next(new AppError("Travel with that id " + req.params.travelId + " not found", 404));
        }

        const dayPlansLength = travel.plan.length;
        const dayPlan = new DayPlan(dayPlansLength + 1);

        travel.plan.push(dayPlan);
        await updateTravel(travel);

        res.status(200).json({
            status: "success",
            data: {
                dayPlan,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createTravelDayPlanItemHandler = async (
    req: Request<CreateTravelDayPlanItemInput["params"], {}, CreateTravelDayPlanItemInput["body"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const travel = await findTravelById(req.params.travelId);
        if (!travel) {
            return next(new AppError("Travel with that ID not found", 404));
        }

        const dayPlan = travel.plan.find((dayPlan) => dayPlan.dayNumber.toString() == req.params.dayNumber);
        if (!dayPlan) {
            return next(new AppError("No plans for day " + req.params.dayNumber, 404));

        }
        dayPlan.planItems?.push(new PlanItem(new Date(req.body.time), req.body.description));
        await updateTravel(travel);

        res.status(200).json({
            status: "success",
            data: {
                dayPlan,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createTravelItemToPickHandler = async (
    req: Request<CreateTravelItemInput["params"], {}, CreateTravelItemInput["body"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        let travel = await findTravelById(req.params.travelId);
        if (!travel) {
            return next(new AppError("Travel with that ID not found", 404));
        }

        let item = new ItemToPick(req.body.description)
        travel.itemsToPick?.push(item);
        await updateTravel(travel);

        travel = await findTravelById(req.params.travelId);
        if (travel) {
            item = travel.itemsToPick[travel.itemsToPick.length - 1];
        }

        res.status(200).json({
            status: "success",
            data: {
                item,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const revertTravelItemIsPickedHandler = async (
    req: Request<UpdateTravelItemInput["params"], {}, UpdateTravelItemInput["body"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const travel = await findTravelById(req.params.travelId);
        if (!travel) {
            return next(new AppError("Travel with that ID not found", 404));
        }

        const item = travel.itemsToPick.find((item) => item._id.toString() === req.body.id);
        if (!item) {
            return next(new AppError("No item " + req.body.id + " found", 404));
        }
        item.isPicked = !item.isPicked;
        await updateTravel(travel);

        res.status(200).json({
            status: "success",
            data: {
                item,
            },
        });
    } catch (err: any) {
        next(err);
    }
};
