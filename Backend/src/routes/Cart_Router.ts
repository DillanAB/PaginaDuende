import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ShopView } from "../views/ShopView";
const router = Router()

//Obtiene el carrito de un usuario
router.get("/cartbyuserid/:id", asyncHandler(
    async (_req, res) => {
        const resCart = await (new ShopView().getCartByUserId(_req))
        res.send(resCart)
    })
)

router.post("/addtocart", asyncHandler(
    async (_req, res) => {
        console.log(_req.params)
        const resCart = await (new ShopView().addToCart(_req))
        res.send(resCart)
    })
)

router.post("/createorder", asyncHandler(
    async (_req, res) => {
        const resCart = await (new ShopView().buyConfirmation(_req))
        res.send(resCart)
    })    
)


export default router