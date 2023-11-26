import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { Product } from "../Shop/Product"
import { ShoppingCart } from "../Shop/ShoppingCart"

export class Mongo_OrderDetail extends DAO_Mongo {
    id!: string
    orderId!: ShoppingCart 
    productId!: Product
    quantity!: number
    price!: number

    constructor(){
        super()
    }
}

export const Mongo_OrderDetail_Schema = new Schema<Mongo_OrderDetail>(
    {
        orderId: { type: Schema.Types.ObjectId, ref:'Order', required: true },
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

export const Mongo_OrderDetail_Model = model<Mongo_OrderDetail>('OrderDetail', Mongo_OrderDetail_Schema)