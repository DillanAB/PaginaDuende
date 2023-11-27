import { Mongo_Cart, Mongo_Cart_Model } from "../models/Database/Mongo_Cart"
import { Mongo_CartDetail, Mongo_CartDetail_Model } from "../models/Database/Mongo_CartDetail"
import { Mongo_Order, Mongo_Order_Model } from "../models/Database/Mongo_Order"
import { Mongo_Product_Model } from "../models/Database/Mongo_Product"
import { SingletonDAO } from "../models/Database/SingletonDAO"
import { CartDetail } from "../models/Shop/CartDetail"
import { ShoppingCart } from "../models/Shop/ShoppingCart"
import { Mongo_OrderDetail_Model } from "../models/Database/Mongo_OrderDetail"
import { Notifier } from "./Notifier"
// import { config } from "../config"

export class AdminCart{
    constructor(){}

    //Obtiene el carrito de un usuario
    public async getCartByUserId(id:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Cart())
        SingletonDAO.getInstance().dbConnect()
        const cart = await Mongo_Cart_Model.find({clientId: id})
        //Revisa si existe el carrito del usuario
        if(cart.length > 0){
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
            return sendCart
        }else{
            //Si no existe, crea uno nuevo
            const newCart = await Mongo_Cart_Model.create({clientId: id, details: [], price: 0})
            return newCart
        }
    }
    //Agregar al carrito
    public async addToCart(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_CartDetail())
        SingletonDAO.getInstance().dbConnect()
        const {cartId, productId, quantity} = jsonData
        console.log(cartId, productId, quantity)
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
            return sendCart
        }else{
           return "Cart not found"
        }
    }
    //Crea la orden de compra
    public async buyCart(jsonData:any, image:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Order())
        SingletonDAO.getInstance().dbConnect()
        
        // const {host, port} = config.appConfig

        const {clientId, cartId, provincia, canton, distrito, detalles, telefono} = jsonData
        // const varImageURL = `${host}:${port}/public/${clientId}` + '.' + image.mimetype.split('/')[1]
        const cartDetails = await Mongo_CartDetail_Model.find({cartId: cartId})
        const newOrder = await Mongo_Order_Model.create({clientId: clientId, provincia: provincia,
                                                        canton: canton, distrito: distrito, detalles: detalles,
                                                        telefono: telefono, receiptURL: 'varImageURL', state: "Pendiente"})
        // const path = `./src/storage/facts/${clientId}` + '.' + image.mimetype.split('/')[1]
        // image.mv(path)
        // console.log("Imagen guardada")
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
        console.log('Nueva orden' + image)
        new Notifier().notifyNewOrder()
        return "Order created"
    }
}