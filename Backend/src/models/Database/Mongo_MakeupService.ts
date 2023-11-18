import { Schema, model } from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
// import { Mongo_MakeupSubCategory } from "./Mongo_MakeupSubCategory"
import { MakeupCategory } from "../Gallery/MakeupCategory"
import { Tag } from "../Gallery/Tag"
import { config } from "../../config"
import { MakeupSubcategory } from "../Gallery/MakeupSubCategory"

export class Mongo_MakeupService extends DAO_Mongo{
    id!: string
    name!: string
    price!: number
    imageURL!: string
    description!: String
    category!: MakeupCategory
    subCategories!: MakeupSubcategory[]
    tags!: Tag[]

    constructor(){
        super()
    }
} 


export const Mongo_MakeupService_Schema = new Schema<Mongo_MakeupService>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        imageURL: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref:'MakeupCategory', required: true },
        subCategories: [{ type: Schema.Types.ObjectId, ref:'MakeupSubCategory', required: true }],
        tags: [{ type: Schema.Types.ObjectId, ref:'Tag', required: true }]
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

Mongo_MakeupService_Schema.methods.setImageURL = function setImageURL(imageName:string) {
    const {host, port} = config.appConfig
    this.imageURL = `${host}:${port}/public/${imageName}`
}

export const Mongo_MakeupService_Model = model<Mongo_MakeupService>('MakeupService', Mongo_MakeupService_Schema)