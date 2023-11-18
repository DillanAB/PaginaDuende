import { AdminGallery } from "./AdminGallery"
import { AdminShop } from "./AdminShop"
import { AdminUser } from "./AdminUser"

export class MainController {
    adminUser:AdminUser = new AdminUser()
    adminGallery:AdminGallery = new AdminGallery()
    adminShop:AdminShop = new AdminShop()

    constructor() { }

    //****************Gallery*******************
    //Obtiene todos los maquillajes de la base de datos
    public getMakeups(){
        return (this.adminGallery.getMakeups()) 
    }
    //Obtiene un maquillaje por su id
    public getMakeupById(id:string){
        return (this.adminGallery.getMakeupById(id))
    }
    //Obtiene los maquillajes por categoría
    public getMakeupsByCategory(categoryId:string){
        return (this.adminGallery.getMakeupsByCategory(categoryId))
    }
    //Obtiene los maquillajes por subcategoría
    public getMakeupsBySubCategory(subcategoryId:string){
        return (this.adminGallery.getMakeupsBySubCategory(subcategoryId))
    }
    //Obtiene los maquillajes por tag
    public getMakeupsByTag(tagId:string){
        return (this.adminGallery.getMakeupsByTag(tagId))
    }
    //Crea un nuevo maquillaje
    public createMakeupService(jsonMakeupService:any, image:any){
        return (this.adminGallery.createMakeupService(jsonMakeupService, image))
    }
    //Obtiene las categorías de maquillaje
    public getMakeupCategories(){
        return (this.adminGallery.getMakeupCategories())
    }
    //Obtiene los tags de maquillaje
    public getMakeupTags(){
        return (this.adminGallery.getMakeupTags())
    }
    //Página de categorías
    //Edita una categoría
    public editMakeupCategory(jsonData:any){
        return (this.adminGallery.editMakeupCategory(jsonData))
    }
    //Edita una subcategoría
    public editMakeupSubCategory(jsonData:any){
        return (this.adminGallery.editMakeupSubCategory(jsonData))
    }
    //Crea una categoría
    public createMakeupCategory(jsonData:any){
        return (this.adminGallery.createMakeupCategory(jsonData))
    }
    public createMakeupSubCategory(jsonData:any){
        return (this.adminGallery.createMakeupSubCategory(jsonData))
    }


    //****************Shop*******************
    //Obtiene todos los productos de la base de datos
    public getProducts(){
        return (this.adminShop.getProducts()) 
    }
    //Obtiene un producto por su id
    public getProductById(id:string){
        return (this.adminShop.getProductById(id))
    }
    //Obtiene los productos por categoría
    public getProductsByCategory(categoryId:string){
        return (this.adminShop.getProductsByCategory(categoryId))
    }
    //Obtiene los productos por subcategoría
    public getProductsBySubCategory(subcategoryId:string){
        return (this.adminShop.getProductsBySubCategory(subcategoryId))
    }
    //Crea un nuevo producto
    public createProduct(jsonMakeupService:any, image:any){
        return (this.adminShop.createProduct(jsonMakeupService, image))
    }
    //Obtiene las categorías de producto
    public getProductCategories(){
        return (this.adminShop.getProductCategories())
    }
    //Página de categorías
    //Edita una categoría
    public editProductCategory(jsonData:any){
        return (this.adminShop.editCategory(jsonData))
    }
    //Edita una subcategoría
    public editProductSubCategory(jsonData:any){
        return (this.adminShop.editSubCategory(jsonData))
    }



    //****************Users*******************

    public login(jsonUser:any){
        return (this.adminUser.login(jsonUser))
    }

    public register(jsonUser:any){
        return (this.adminUser.register(jsonUser))
    }
}   