import fileUpload from "express-fileupload"
import { MainController } from "../controllers/MainController"
import { View } from "./View"

export class ShopView extends View {

    constructor() {
        super()
    }
    //Obtiene todos los productos de la base de datos
    public getProducts(){
        return (new MainController().getProducts())
    }
    //Obtiene un producto por su id
    public getProductById(req:any){
        const id = req.params.id
        return (new MainController().getProductById(id))
    }
    //Obtiene los productos por categoría
    public getProductsByCategory(req:any){
        const categoryId = req.params.categoryId
        return (new MainController().getProductsByCategory(categoryId))
    }
    //Obtiene los productos por subcategoría
    public getProductsBySubCategory(req:any){
        const subcategoryId = req.params.subcategoryId
        return (new MainController().getProductsBySubCategory(subcategoryId))
    }
    //Crea un nuevo producto
    public createProduct(req:any){
        //Prepara la información para crear el producto
        const jsonData = JSON.parse(req.body.data)
        const image = req.files.image as fileUpload.UploadedFile
        //Llama al controlador para crear el producto
        new MainController().createProduct(jsonData, image)
    }
    //Obtiene las categorías de producto
    public getProductCategories(){
        return (new MainController().getProductCategories())
    }

    //************************Página de categorías **************/
    //Edita una categoría
    public editCategory(req:any){
        const jsonData = req.body
        return (new MainController().editProductCategory(jsonData))
    }
    //Edita una subcategoría
    public editSubCategory(req: any) {
        const jsonData = req.body
        return (new MainController().editProductSubCategory(jsonData))
    }

    public addToCart(req: any) {
        const jsonData = req.body
        return (new MainController().addToCart(jsonData))
    }

    public buyConfirmation(req: any) {
        const jsonData = req.body
        return (new MainController().buyCart(jsonData))
    }
}