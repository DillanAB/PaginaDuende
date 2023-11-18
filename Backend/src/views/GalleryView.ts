import fileUpload from "express-fileupload";
import { View } from "./View";
import { MainController } from "../controllers/MainController";

export class GalleryView extends View {

    constructor() {
        super()
    }
    //Obtiene todos los maquillajes de la base de datos
    public getMakeups(){
        return (new MainController().getMakeups())
    }
    //Obtiene un maquillaje por su id
    public getMakeupById(req:any){
        const id = req.params.id
        return (new MainController().getMakeupById(id))
    }
    //Obtiene los maquillajes por categoría
    public getMakeupsByCategory(req:any){
        const categoryId = req.params.categoryId
        return (new MainController().getMakeupsByCategory(categoryId))
    }
    //Obtiene los maquillajes por subcategoría
    public getMakeupsBySubCategory(req:any){
        const subcategoryId = req.params.subcategoryId
        return (new MainController().getMakeupsBySubCategory(subcategoryId))
    }
    //Obtiene los maquillajes por tag
    public getMakeupsByTag(req:any){
        const tagId = req.params.tagId
        return (new MainController().getMakeupsByTag(tagId))
    }
    //Crea un nuevo maquillaje
    public createMakeupService(req:any){
        //Prepara la información para crear el maquillaje
        const jsonData = JSON.parse(req.body.data)
        const image = req.files.image as fileUpload.UploadedFile
        //Llama al controlador para crear el maquillaje
        new MainController().createMakeupService(jsonData, image)
    }
    //Obtiene las categorías de maquillaje
    public getMakeupCategories(){
        return (new MainController().getMakeupCategories())
    }
    //Obtiene los tags de maquillaje
    public getMakeupTags(){
        return (new MainController().getMakeupTags())
    }

    //************************Página de categorías **************/
    //Edita una categoría
    public editCategory(req:any){
        const jsonData = req.body
        return (new MainController().editMakeupCategory(jsonData))
    }
    //Edita una subcategoría
    public editSubCategory(req: any) {
        const jsonData = req.body
        return (new MainController().editMakeupSubCategory(jsonData))
    }
    //Crea una categoría
    public createCategory(req:any){
        const jsonData = req.body
        return (new MainController().createMakeupCategory(jsonData))
    }
    public createSubCategory(req:any){
        const jsonData = req.body
        return (new MainController().createMakeupSubCategory(jsonData))
    }


}