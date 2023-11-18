import mongoose, { ConnectOptions, connect } from "mongoose";
import { DAO } from "./DAO";

export abstract class DAO_Mongo extends DAO {
    private connectionURL:string
    private isConnect: boolean = false

    constructor(){
        super()
        const URL = "mongodb+srv://Admin:Duende-GR2-8@duendedb.77ombjt.mongodb.net/App?retryWrites=true&w=majority"
        this.connectionURL = URL
    }

    //Conexion a la base de datos MongoDB
    public dbConnect = () => {
        connect(this.connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions).then(
            () => console.log("Connected to MongoDB"),
            (error) => console.log(error)
        )
    }

    public dbDisconnect = () => {
        if(this.isConnect){ 
            mongoose.connection.close()
            console.log("Disconnected from MongoDB")
        }else{
            console.log("No se está conectado a ninguna base de datos");
        }
    }
}