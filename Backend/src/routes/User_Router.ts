import { Router } from "express";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import { sample_users } from "../data";
import { Mongo_User_Model, Mongo_Users } from "../models/Database/Mongo_Users";
import { SingletonDAO } from "../models/Database/SingletonDAO";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { UserView } from "../views/UserView";

const router = Router();
const userView = new UserView()

//Seed, carga datos de  usuarios cuando la base de datos está vacía
router.get("/seed", asyncHandler(
    async (_req, res) => {
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Users())
        SingletonDAO.getInstance().dbConnect()
        const makeupsCount = await Mongo_User_Model.countDocuments();
        if (makeupsCount > 0) {
            res.send("Seed is already done")
        }
        else{
            await Mongo_User_Model.create(sample_users);
            res.send("Seed is done");
        }
        SingletonDAO.getInstance().dbDisconnect()
    })
)
// Login
router.post("/login", asyncHandler(
    async (_req, res) => {
        const user = await userView.login(_req)
        //Revisar si se encontró al usuario
        if(user){
            console.log("Usuario encontrado")
            res.send(generateTokenResponse(user))
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("Email o contraseña incorrectos")
        }
    })
)
// Registrar usuario
router.post("/register", asyncHandler(
    async (_req, res) => {
        const {user, dbUser} = await userView.register(_req)
        //Revisar si ya hay un usuario con ese email
        if(user){
            console.log("Ya existe un usuario con ese email")
            res.status(HTTP_BAD_REQUEST).send("Ya existe un usuario con ese email")
        }
        else{
            console.log("Usuario creado")
            res.send(generateTokenResponse(dbUser))
        }
    })
)
//Genera un token para el usuario
const generateTokenResponse = (user:any) => {
    console.log(user)
    const token = jwt.sign(
        {
            email: user.email,
            isAdmin:user.isAdmin
        }, "randomstring", {expiresIn:"30d"})
    user.token = token
    return user
}

export default router