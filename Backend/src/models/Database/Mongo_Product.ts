import { Schema, model } from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { config } from "../../config"
import { ProductCategory } from "../Shop/ProductCategory"
import { ProductSubcategory } from "../Shop/ProductSubCategory"

export class Mongo_Product extends DAO_Mongo{
    id!: string
    name!: string
    price!: number
    imageURL!: string
    category!: ProductCategory
    subCategories!: ProductSubcategory[]
    availability!: boolean
    description!: String

    constructor(){
        super()
    }
} 


export const DAO_Product_Schema = new Schema<Mongo_Product>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        imageURL: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref:'ProductCategory', required: true },
        subCategories: [{ type: Schema.Types.ObjectId, ref:'ProductSubCategory', required: true }],
        availability: { type: Boolean, required: true },
        description: { type: String, required: true }
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true,
    }
)

DAO_Product_Schema.methods.setImageURL = function setImageURL(imageName:string) {
    const {host, port} = config.appConfig
    this.imageURL = `${host}:${port}/public/${imageName}`
}

export const DAO_Product_Model = model<Mongo_Product>('Product', DAO_Product_Schema)