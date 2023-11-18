import { Schema, model} from "mongoose"
import { DAO_Mongo } from "./DAO_Mongo"

export class Mongo_Users extends DAO_Mongo {
    id!: string
    name!: string
    email!: string
    password!: string
    isAdmin!: boolean

    constructor(){
        super()
    }
}

export const Mongo_User_Schema = new Schema<Mongo_Users>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true}
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

export const Mongo_User_Model = model<Mongo_Users>('User', Mongo_User_Schema)  