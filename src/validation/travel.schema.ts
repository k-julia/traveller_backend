import {number, object, string, TypeOf} from 'zod';

export const createTravelSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
    })
});

export const generateTravelSchema = object({
    body: object({
        country: string({ required_error: 'Country is required' }),
        date: string({ required_error: 'Date is required' }),
        dayNumber: number({required_error: 'Number of travel days is required'})
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

export const updateTravelItemSchema = object({
    params: object({
        travelId: string(),
    }),
    body: object({
        id: string({ required_error: 'Id is required' }),
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
export type UpdateTravelItemInput = TypeOf<typeof updateTravelItemSchema>;
export type GenerateTravelInput = TypeOf<typeof generateTravelSchema>;