import axios from "axios";
import {createTravel} from "./travel.service";
import {Ref} from "@typegoose/typegoose";
import {User} from "../models/user.model";
import {DayPlan, ItemToPick, PlanItem} from "../models/travel.model";
import {string} from "zod";

export const generateTravelByRequest = async (country: string, date: string, dayNumber: number, wishes: string, userId: Ref<User>) => {
    const body = {
        country: country,
        date: date,
        dayNumber: dayNumber,
        wishes: wishes
    }

    const response = await axios.post('http://localhost:8081', body)
    const travelName = response.data.travelName
    console.log(response.data.travelPlan)

    const dayPlans = response.data.travelPlan.map(function(day: any) {
        const dayPlan = new DayPlan(day.dayNumber)
        console.log(day.planItems)
        dayPlan.planItems = day.planItems.map(function (item: any) {
            return new PlanItem(new Date(item.time), item.activity);
        });
        return dayPlan;
    });

    console.log(response.data.itemsToPick)
    const itemsToPick = response.data.itemsToPick.map(function(item: any) {
        return new ItemToPick(item)
    });

    return await createTravel({
            name: travelName,
            userId: userId,
            itemsToPick: itemsToPick,
            plan:dayPlans
        }
    )
}