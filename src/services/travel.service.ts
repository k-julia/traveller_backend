import travelModel , { Travel } from '../models/travel.model';
import {Ref} from "@typegoose/typegoose";
import {User} from "../models/user.model";

export const createTravel = async (input: Partial<Travel>) => {
    return await travelModel.create(input);
};

export const createTravelFromGptResponse = async (gptResponse: JSON, userId: Ref<User>) => {
    console.log(gptResponse.parse("travelName"))
    const travel = await createTravel({
        name: gptResponse.parse("travelName"),
        userId: userId,
    });
    console.log(gptResponse.parse("itemsToPick"))
    console.log(gptResponse.parse("travelPlan"))

    return await travelModel.create(travel);
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


