import {object, string, TypeOf} from 'zod';
import {createTravelDayPlanHandler} from "../controllers/travel.controller";

export const createTravelSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
    })
});

export const createTravelDayPlanItemSchema = object({
    params: object({
        travelId: string(),
        dayNumber: string(),
    }),
    body: object({
        description: string({ required_error: 'Description is required' }),
        time: string(),
    })
});

export const createTravelItemSchema = object({
    params: object({
        travelId: string(),
    }),
    body: object({
        description: string({ required_error: 'Description is required' }),
    })
});


export const travelSchema = object({
    params: object({
        travelId: string(),
    }),
});

export type TravelInput = TypeOf<typeof travelSchema>;
export type CreateTravelDayPlanItemInput = TypeOf<typeof createTravelDayPlanItemSchema>
export type CreateTravelItemInput = TypeOf<typeof createTravelItemSchema>;