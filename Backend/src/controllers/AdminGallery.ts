import { config } from "../config";
import { Mongo_MakeupCategory, Mongo_MakeupCategory_Model } from "../models/Database/Mongo_MakeupCategory";
import { Mongo_MakeupService, Mongo_MakeupService_Model } from "../models/Database/Mongo_MakeupService";
import { Mongo_MakeupSubCategory_Model } from "../models/Database/Mongo_MakeupSubCategory";
import { Mongo_Tag_Model } from "../models/Database/Mongo_Tag";
import { SingletonDAO } from "../models/Database/SingletonDAO";
import { FactoryMakeupService } from "../models/Gallery/FactoryMakeupService";
import { MakeupCategory } from "../models/Gallery/MakeupCategory";
import { MakeupSubcategory } from "../models/Gallery/MakeupSubCategory";
import { Tag } from "../models/Gallery/Tag";


//Controlador de la galería
export class AdminGallery {
    constructor(){}
    //Obtiene todos los maquillajes de la base de datos
    public async getMakeups(){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()
        const makeups = await Mongo_MakeupService_Model.find()
        SingletonDAO.getInstance().dbDisconnect()
        return makeups
    }
    //Obtiene los maquillajes por categoría
    public async getMakeupById(id:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()
        const makeup = await Mongo_MakeupService_Model.findById(id)

        if(makeup?.category){
            makeup.category = await Mongo_MakeupCategory_Model.findById(makeup.category) as MakeupCategory
            makeup.subCategories = await Mongo_MakeupSubCategory_Model.find({_id:{ $in: makeup?.subCategories }}) as MakeupSubcategory[]
          }
          
          if(makeup?.tags)
            makeup.tags = await Mongo_Tag_Model.find({_id:{ $in: makeup?.tags }}) as Tag[]
        
        SingletonDAO.getInstance().dbDisconnect()
        return makeup
    }
    //Obtiene los maquillajes por categoría
    public async getMakeupsByCategory(categoryId:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()
        const makeups = await Mongo_MakeupService_Model.find({ category: categoryId })

        SingletonDAO.getInstance().dbDisconnect()
        return makeups
    }
    //Obtiene los maquillajes por subcategoría
    public async getMakeupsBySubCategory(subcategoryId:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()
        const makeups = await Mongo_MakeupService_Model.find({ subCategories: subcategoryId })
        SingletonDAO.getInstance().dbDisconnect()
        return makeups
    }
    //Obtiene los maquillajes por tag
    public async getMakeupsByTag(tagId:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()
        const makeups = await Mongo_MakeupService_Model.find({ tags: {$in:{_id: tagId }}})
        SingletonDAO.getInstance().dbDisconnect()
        return makeups
    }
    //Crea un maquillaje y lo sube a la base de datos
    public async  createMakeupService(jsonMakeupService:any, image:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
        SingletonDAO.getInstance().dbConnect()

        //Revisa si existe un maquillaje con ese nombre
        const {name} = jsonMakeupService
        const makeup = await Mongo_MakeupService_Model.findOne({name})
        
        if (makeup){
            console.log("Ya existe un maquillaje con ese nombre")
        }else{
            //Crea el maquillaje y lo sube a la base de datos
            const {host, port} = config.appConfig
            const varImageURL = `${host}:${port}/public/${name}` + '.' + image.mimetype.split('/')[1]
            const newJsonMakeupService = Object.assign(jsonMakeupService, {imageURL: varImageURL})//Nuevo JSON con la URL

            const newMakeup = new FactoryMakeupService().create(newJsonMakeupService)
            const dbMakeup = await Mongo_MakeupService_Model.create(newMakeup)
            console.log("Maquillaje creado")

            //Sube la imagen a la carpeta de imágenes
            if(dbMakeup){  
                const path = `./src/storage/MakeupServicesImages/${name}` + '.' + image.mimetype.split('/')[1]
                image.mv(path)
                console.log("Imagen guardada")
                return dbMakeup
            }
        }
    }
    //Obtiene las categorías de maquillaje
    public async getMakeupCategories(){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const categories = await Mongo_MakeupCategory_Model.find()
        SingletonDAO.getInstance().dbDisconnect()
        return categories
    }
    //Obtiene los tags de maquillaje
    public async getMakeupTags(){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const tags = await Mongo_Tag_Model.find()
        SingletonDAO.getInstance().dbDisconnect()
        return tags
    }

    //Página de categorías
    //Edita una categoría
    public async editMakeupCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const {id, newName} = jsonData
        const category = await Mongo_MakeupCategory_Model.findById(id)
        if(category){
            category.name = newName
            await category.save()
            console.log("Categoría editada")
        }else{
            console.log("No existe la categoría")
        }
        SingletonDAO.getInstance().dbDisconnect()
        return category
    }
    //Edita una subcategoría
    public async editMakeupSubCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const {catId, id, newName} = jsonData
        const category = await Mongo_MakeupCategory_Model.findById(catId)

        if(category){
            const subcat = await Mongo_MakeupSubCategory_Model.findById(id)
            if(subcat){
                subcat.name = newName
                await subcat.save()
                let subCategories = await category.subcategories
                const index = subCategories.findIndex(subcat => subcat.id === id)
                subCategories[index] = subcat
                await category.save()
                console.log("Subategoría editada")
            }else{
                console.log("No existe la subcategoría")
            }
        }else{
            console.log("No existe la categoría")
        }
        SingletonDAO.getInstance().dbDisconnect()
    }
    //Crea una categoría
    public async createMakeupCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const {name} = jsonData
        const category = await Mongo_MakeupCategory_Model.findOne({name})
        if(category){
            console.log("Ya existe una categoría con ese nombre")
        }else{
            const newCategory = await Mongo_MakeupCategory_Model.create({name})
            console.log("Categoría creada")
            SingletonDAO.getInstance().dbDisconnect()
            return newCategory
        }
    }
    //Crea una subcategoría
    public async createMakeupSubCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const {catId, name} = jsonData
        const category = await Mongo_MakeupCategory_Model.findById(catId)
        if(category){
            const subcategory = await Mongo_MakeupSubCategory_Model.findOne({name})
            if(subcategory){
                console.log("Ya existe una subcategoría con ese nombre")
            }else{
                const newSubcategory = await Mongo_MakeupSubCategory_Model.create({name})
                category.subcategories.push(newSubcategory)
                await category.save()
                console.log("Subcategoría creada")
                SingletonDAO.getInstance().dbDisconnect()
                return newSubcategory
            }
        }else{
            console.log("No existe la categoría")
        }
    }
    //Elimina una categoría
    public async deleteMakeupCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
        SingletonDAO.getInstance().dbConnect()
        const {id} = jsonData
        const category = await Mongo_MakeupCategory_Model.findById(id)
        if(category){
            await category.deleteOne()
            console.log("Categoría eliminada")
        }else{
            console.log("No existe la categoría")
        }
        SingletonDAO.getInstance().dbDisconnect()
    }

}