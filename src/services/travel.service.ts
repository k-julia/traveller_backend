import travelModel , { Travel } from '../models/travel.model';

export const createTravel = async (input: Partial<Travel>) => {
    return await travelModel.create(input);
};

export const updateTravel = async (input: Partial<Travel>) => {
    return travelModel.updateOne({ _id: input.id }, { $set: input} );
};

export const findTravelById = async (id: string) => {
    return travelModel.findById(id).lean();
};

export const findAllTravelsForUser = async (userId: string) => {
    return travelModel.find({userId: userId.toString()});
};


