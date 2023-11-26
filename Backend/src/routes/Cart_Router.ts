import { Router } from "express";
import asyncHandler from "express-async-handler";
import { SingletonDAO } from "../models/Database/SingletonDAO";
import { Mongo_CartDetail, Mongo_CartDetail_Model } from "../models/Database/Mongo_CartDetail";
import { Mongo_Cart, Mongo_Cart_Model } from "../models/Database/Mongo_Cart";
import { ShoppingCart } from "../models/Shop/ShoppingCart";
import { Mongo_Product_Model } from "../models/Database/Mongo_Product";
import { CartDetail } from "../models/Shop/CartDetail";
import { Mongo_Order, Mongo_Order_Model } from "../models/Database/Mongo_Order";
import {Mongo_OrderDetail_Model } from "../models/Database/Mongo_OrderDetail";

const router = Router()

router.get("/cartbyuserid/:id", asyncHandler(
    async (_req, res) => {
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Cart())
        SingletonDAO.getInstance().dbConnect()
        const cart = await Mongo_Cart_Model.find({clientId: _req.params.id})
        //Revisa si existe el carrito del usuario
        if(cart.length > 0){
            // const cartSend:ShoppingCart = new ShoppingCart(cart[0].id, cart[0].clientId, cart[0].details)

            //Luego separar en otra función
            //Obtiene todos los detalles del carrito
            const cartDetails = await Mongo_CartDetail_Model.find({cartId: cart[0].id})
            let details:CartDetail[] = []
            for (let i = 0; i < cartDetails.length; i++) {
                //Obtiene el producto de cada detalle
                const productDetail = await Mongo_Product_Model.findById(cartDetails[i].productId)
                if(productDetail){
                    //Crea un nuevo detalle de carrito con el producto y la cantidad
                    const newCartDetail = new CartDetail(productDetail, cartDetails[i].quantity)
                    //Agrega el detalle al carrito
                    details.push(newCartDetail)
                }
            }
            let sendCart = new ShoppingCart(cart[0].id, cart[0].clientId, details)
            // sendCart.details = details 
            // console.log("TODO BIEN", sendCart)
            res.send(sendCart)
        }else{
            //Si no existe, crea uno nuevo
            const newCart = await Mongo_Cart_Model.create({clientId: _req.params.id, details: [], price: 0})
            res.send(newCart)
        }
    })
)

router.post("/addtocart", asyncHandler(
    async (_req, res) => {
        SingletonDAO.getInstance().setAccessDAO(new Mongo_CartDetail())
        SingletonDAO.getInstance().dbConnect()
        const {cartId, productId, quantity} = _req.body
        const cart = await Mongo_Cart_Model.findById(cartId)

        if(cart){
            await Mongo_CartDetail_Model.create({cartId:cartId,productId:productId, quantity:quantity})

            let sendCart = new ShoppingCart(cart.id, cart.clientId, [])
            //Luego separar en otra función
            //Obtiene todos los detalles del carrito
            const cartDetails = await Mongo_CartDetail_Model.find({cartId: cart.id})
            for (let i = 0; i < cartDetails.length; i++) {
                //Obtiene el producto de cada detalle
                const productDetail = await Mongo_Product_Model.findById(cartDetails[i].productId)
                if(productDetail){
                //Crea un nuevo detalle de carrito con el producto y la cantidad
                const newCartDetail = new CartDetail(productDetail, cartDetails[i].quantity)
                //Agrega el detalle al carrito
                sendCart.details.push(newCartDetail)
                }
            }
            console.log("TODO BIEN", sendCart)
            res.send(sendCart)
        }else{
            console.log("Cart not found" + cartId)
            res.send("Cart not found")
        }
    })
)

router.post("/createorder", asyncHandler(
    async (_req, res) => {
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Order())
        SingletonDAO.getInstance().dbConnect()
        // const JSONDATA = JSON.parse(_req.body.data)
        console.log(_req.body)
        const {clientId, cartId, provincia, canton, distrito, detalles, telefono} = _req.body
        const cartDetails = await Mongo_CartDetail_Model.find({cartId: cartId})
        const newOrder = await Mongo_Order_Model.create({clientId: clientId, provincia: provincia,
                                                        canton: canton, distrito: distrito, detalles: detalles,
                                                        telefono: telefono, receiptURL: "dw", state: "Pendiente"})
        // let newOrderDetails:OrderDetail[] = []
        for (let i = 0; i < cartDetails.length; i++) {
            //Obtiene el producto de cada detalle
            const product = await Mongo_Product_Model.findById(cartDetails[i].productId)
            if(product){
                //Crea un nuevo detalle de orden con el producto y la cantidad
                await Mongo_OrderDetail_Model.create({productId:cartDetails[i].productId, orderId: newOrder.id, quantity: cartDetails[i].quantity})

                // newOrderDetails.push(newOrderDetail)
            }
            await cartDetails[i].deleteOne()
        }
        res.send("Order created")
    })    
)


export default router