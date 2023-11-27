import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { Product } from "../Shop/Product"
import { ShoppingCart } from "../Shop/ShoppingCart"

export class Mongo_CartDetail extends DAO_Mongo {
    id!: string
    cartId!: ShoppingCart 
    productId!: Product
    quantity!: number
    price!: number

    constructor(){
        super()
    }
}

export const Mongo_CartDetail_Schema = new Schema<Mongo_CartDetail>(
    {
        cartId: { type: Schema.Types.ObjectId, ref:'ShoppingCart', required: true },
        productId: { type: Schema.Types.ObjectId, ref:'Product', required: true },
        quantity: { type: Number, required: true },
        // price: { type: Number, required: true }
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

export const Mongo_CartDetail_Model = model<Mongo_CartDetail>('CartDetail', Mongo_CartDetail_Schema)