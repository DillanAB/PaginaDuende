import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { Mongo_MakeupSubCategory, Mongo_MakeupSubCategory_Schema } from "../Database/Mongo_MakeupSubCategory"

export class Mongo_MakeupCategory extends DAO_Mongo {
    id!: string
    name!: string
    subcategories!: Mongo_MakeupSubCategory[]


    constructor(){
        super()
    }
}

export const Mongo_MakeupCategory_Schema = new Schema<Mongo_MakeupCategory>(
    {
        name: { type: String, required: true },
        subcategories: [{ type:Mongo_MakeupSubCategory_Schema , ref:'MakeupSubCategory', required: true }]
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

export const Mongo_MakeupCategory_Model = model<Mongo_MakeupCategory>('MakeupCategory', Mongo_MakeupCategory_Schema)