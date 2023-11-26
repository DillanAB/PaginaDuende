import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
import { CartDetail } from "../Shop/CartDetail"
import { Mongo_CartDetail_Schema } from "./Mongo_CartDetail"


export class Mongo_Cart extends DAO_Mongo {
    id!: string
    clientId!: string
    details!: CartDetail[]
    // price!: number

    constructor(){
        super()
    }
}

export const Mongo_Cart_Schema = new Schema<Mongo_Cart>(
    {
        clientId: { type: String, required: true },
        details: [{ type: Mongo_CartDetail_Schema, ref:'CartDetail', required: true }],
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

export const Mongo_Cart_Model = model<Mongo_Cart>('ShoppingCart', Mongo_Cart_Schema)