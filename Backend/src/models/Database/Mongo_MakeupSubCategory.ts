import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"

export class Mongo_MakeupSubCategory extends DAO_Mongo {
    id!: string
    name!: string

    constructor(){
        super()
    }
}

export const Mongo_MakeupSubCategory_Schema = new Schema<Mongo_MakeupSubCategory>(
    {
        name: { type: String, required: true }
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

export const Mongo_MakeupSubCategory_Model = model<Mongo_MakeupSubCategory>('MakeupSubCategory', Mongo_MakeupSubCategory_Schema)