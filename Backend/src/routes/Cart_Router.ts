import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ShopView } from "../views/ShopView";
// import fileUpload from "express-fileupload";
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

// router.use(fileUpload({
//     createParentPath: true
//   }))
// router.post("/createorder", (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         console.log("No se recibieron archivos")
//         return res.status(400).send('No se recibieron archivos');
//     }
//         (new ShopView().buyConfirmation(req))
//   })

router.post("/createorder", asyncHandler(
    async (_req, res) => {
        const resCart = await (new ShopView().buyConfirmation(_req))
        res.send(resCart)
    })    
)

export default router