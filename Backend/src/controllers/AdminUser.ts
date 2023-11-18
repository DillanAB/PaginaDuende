import { Mongo_User_Model, Mongo_Users } from "../models/Database/Mongo_Users"
import { SingletonDAO } from "../models/Database/SingletonDAO"
import bcrypt from 'bcryptjs'
import { FactoryUser } from "../models/Users/FactoryUser"

//Controlador de usuarios
export class AdminUser {
    constructor() {}

    //Iniciar sesión
    public async login(jsonUser:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Users())
        SingletonDAO.getInstance().dbConnect()

        const {email, password} = jsonUser
        const user = await Mongo_User_Model.findOne({email, password})

        SingletonDAO.getInstance().dbDisconnect()
        return user
    }

    //Registrar usuario
    public async register(jsonUser:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Users())
        SingletonDAO.getInstance().dbConnect()

        const {email, password, name} = jsonUser
        const user = await Mongo_User_Model.findOne({email})

        //Revisa si existe un usuario con ese email
        if(user){
            return {user}
        }
        else{
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new FactoryUser().create(name, email, encryptedPassword, false)
            const dbUser = await Mongo_User_Model.create(newUser)
            
            return {user: null, dbUser}
        }
    }
}

