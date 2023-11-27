import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"
// import { Mongo_OrderDetail_Schema } from "./Mongo_OrderDetail"
// import { OrderDetail } from "../Shop/OrderDetail"


export class Mongo_Order extends DAO_Mongo {
    id!: string
    clientId!: string
    provincia!: string
    canton!: string
    distrito!: string;
    detalles!: string;	
    telefono!: number;
    receiptURL!: string;
    state!: string;
    // details!: OrderDetail[]
    // price!: number

    constructor(){
        super()
    }
}

export const Mongo_Order_Schema = new Schema<Mongo_Order>(
    {
        clientId: { type: String, required: true },
        provincia: { type: String, required: true },
        canton: { type: String, required: true },
        distrito: { type: String, required: true },
        detalles: { type: String, required: true },
        telefono: { type: Number, required: true },
        receiptURL: { type: String, required: true },
        state: { type: String, required: true }
        // details: [{ type: Mongo_OrderDetail_Schema, ref:'OrderDetail', required: true }],
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

export const Mongo_Order_Model = model<Mongo_Order>('Order', Mongo_Order_Schema)