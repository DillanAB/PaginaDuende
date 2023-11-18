import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { Mongo_ProductSubCategory, Mongo_ProductSubCategory_Schema } from "../Database/Mongo_ProductSubCategory"

export class Mongo_ProductCategory extends DAO_Mongo {
    id!: string
    name!: string
    subcategories!: Mongo_ProductSubCategory[]


    constructor(){
        super()
    }
}

export const Mongo_ProductCategory_Schema = new Schema<Mongo_ProductCategory>(
    {
        name: { type: String, required: true },
        subcategories: [{ type:Mongo_ProductSubCategory_Schema , ref:'ProductSubCategory', required: true }]
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

export const Mongo_ProductCategory_Model = model<Mongo_ProductCategory>('ProductCategory', Mongo_ProductCategory_Schema)