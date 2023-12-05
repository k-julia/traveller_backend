import {
    getModelForClass,
    Ref,
    index,
    modelOptions,
    prop, pre
} from '@typegoose/typegoose';
import {User} from "./user.model";

export class ItemToPick {
    constructor(name: string) {
        this.name = name;
        this.isPicked = false;
    }

    @prop({ required: true, unique: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => Boolean})
    isPicked: boolean;
}

export class PlanItem {
    constructor(time: Date | undefined, description: string) {
        if (time) {
            this.time = time;
        }
        this.description = description;
    }

    @prop({ required: false, type: () => Date })
    time: Date;

    @prop({ required: true, type: () => String })
    description: string;
}

export class DayPlan {
    constructor(dayNumber: number) {
        this.dayNumber = dayNumber;
    }

    @prop({required: true, type: () => Number})
    dayNumber: number;

    @prop({ required: false, type: () => [PlanItem] })
    planItems: PlanItem[];
}

@pre<Travel>("save", function (next) {
    this.id = this._id;
    next();
})
@index({ name: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Travel {
    @prop()
    id: string;

    @prop({ unique: true, required: true })
    name: string;

    @prop({ required: false, type: () => [ItemToPick] })
    itemsToPick: ItemToPick[];

    @prop({ required: false, type: () => [DayPlan] })
    plan: DayPlan[];

    @prop({ ref: () => User, required: true })
    userId: Ref<User>;
}

const travelModel = getModelForClass(Travel);
export default travelModel;

