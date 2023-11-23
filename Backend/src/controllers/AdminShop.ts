import { config } from "../config"
import { DAO_Product_Model, Mongo_Product } from "../models/Database/Mongo_Product"
import { Mongo_ProductCategory, Mongo_ProductCategory_Model } from "../models/Database/Mongo_ProductCategory"
import { Mongo_ProductSubCategory_Model } from "../models/Database/Mongo_ProductSubCategory"
import { SingletonDAO } from "../models/Database/SingletonDAO"
import { FactoryProduct } from "../models/Shop/FactoryProduct"
import { ProductCategory } from "../models/Shop/ProductCategory"
import { ProductSubcategory } from "../models/Shop/ProductSubCategory"

export class AdminShop {

    constructor(){}
    //Obtiene todos los productos de la base de datos
    public async getProducts(){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
        SingletonDAO.getInstance().dbConnect()
        const products = await DAO_Product_Model.find()
        SingletonDAO.getInstance().dbDisconnect()
        return products
    }
    //Obtiene los productos por categoría
    public async getProductById(id:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
        SingletonDAO.getInstance().dbConnect()
        const product = await DAO_Product_Model.findById(id)

        if(product?.category){
            product.category = await Mongo_ProductCategory_Model.findById(product.category) as ProductCategory
            product.subCategories = await Mongo_ProductSubCategory_Model.find({_id:{ $in: product?.subCategories }}) as ProductSubcategory[]
          }
        SingletonDAO.getInstance().dbDisconnect()
        return product
    }
    //Obtiene los productos por categoría
    public async getProductsByCategory(categoryId:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
        SingletonDAO.getInstance().dbConnect()
        const products = await DAO_Product_Model.find({ category: categoryId })

        SingletonDAO.getInstance().dbDisconnect()
        return products
    }
    //Obtiene los productos por subcategoría
    public async getProductsBySubCategory(subcategoryId:string){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
        SingletonDAO.getInstance().dbConnect()
        const products = await DAO_Product_Model.find({ subCategories: subcategoryId })
        SingletonDAO.getInstance().dbDisconnect()
        return products
    }
    //Crea un producto y lo sube a la base de datos
    public async  createProduct(jsonProductService:any, image:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
        SingletonDAO.getInstance().dbConnect()

        //Revisa si existe un producto con ese nombre
        const {name} = jsonProductService
        const product = await DAO_Product_Model.findOne({name})
        
        if (product){
            console.log("Ya existe un maquillaje con ese nombre")
        }else{
            //Crea el producto y lo sube a la base de datos
            const {host, port} = config.appConfig
            const varImageURL = `${host}:${port}/public/${name}` + '.' + image.mimetype.split('/')[1]
            const newJsonProduct = Object.assign(jsonProductService, {imageURL: varImageURL})//Nuevo JSON con la URL

            const newProduct = new FactoryProduct().create(newJsonProduct)
            const dbProduct = await DAO_Product_Model.create(newProduct)
            console.log("Producto creado")

            //Sube la imagen a la carpeta de imágenes
            if(dbProduct){  
                const path = `./src/storage/ProductsImages/${name}` + '.' + image.mimetype.split('/')[1]
                image.mv(path)
                console.log("Imagen guardada")
                return dbProduct
            }
        }
    }
    //Obtiene las categorías de la tienda
    public async getProductCategories(){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory())
        SingletonDAO.getInstance().dbConnect()
        const categories = await Mongo_ProductCategory_Model.find()
        SingletonDAO.getInstance().dbDisconnect()
        return categories
    }

    //Página de categorías
    //Edita una categoría
    public async editCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory())
        SingletonDAO.getInstance().dbConnect()
        const {id, newName} = jsonData
        const category = await Mongo_ProductCategory_Model.findById(id)
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
    public async editSubCategory(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory())
        SingletonDAO.getInstance().dbConnect()
        const {catId, id, newName} = jsonData
        const category = await Mongo_ProductCategory_Model.findById(catId)

        if(category){
            const subcat = await Mongo_ProductSubCategory_Model.findById(id)
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

    public async addToCart(jsonData:any){
        
    }

    public async buyCart(jsonData:any){
        SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory())
        SingletonDAO.getInstance().dbConnect()
        const {catId, id, newName} = jsonData
        const category = await Mongo_ProductCategory_Model.findById(catId)

        if(category){
            const subcat = await Mongo_ProductSubCategory_Model.findById(id)
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
}