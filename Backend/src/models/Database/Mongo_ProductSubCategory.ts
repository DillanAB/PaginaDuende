import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"

export class Mongo_ProductSubCategory extends DAO_Mongo {
    id!: string
    name!: string

    constructor(){
        super()
    }
}

export const Mongo_ProductSubCategory_Schema = new Schema<Mongo_ProductSubCategory>(
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

export const Mongo_ProductSubCategory_Model = model<Mongo_ProductSubCategory>('ProductSubCategory', Mongo_ProductSubCategory_Schema)