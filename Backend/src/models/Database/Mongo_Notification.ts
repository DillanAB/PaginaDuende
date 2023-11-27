import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"

export class Mongo_Notification extends DAO_Mongo {
    id!: string
    userId!: string
    message!: string
    readed!: boolean
    date!: Date

    constructor(){
        super()
    }
}

export const Mongo_Notification_Schema = new Schema<Mongo_Notification>(
    {
        userId: { type: String, required: true },
        message: { type: String, required: true },
        readed: { type: Boolean, required: true }
        // date: { type: Date, required: true }
    },
    {
        timestamps: true,
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        } 
    }
)

export const Mongo_Notification_Model = model<Mongo_Notification>('Notification', Mongo_Notification_Schema)