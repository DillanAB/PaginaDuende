import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"

export class Mongo_Tag extends DAO_Mongo {
    id!: string
    name!: string

    constructor(){
        super()
    }
}

export const Mongo_Tag_Schema = new Schema<Mongo_Tag>(
    {name: { type: String, required: true }},
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

export const Mongo_Tag_Model = model<Mongo_Tag>('Tag', Mongo_Tag_Schema)