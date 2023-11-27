import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Mongo_Product_Model, Mongo_Product } from "../models/Database/Mongo_Product";
import { SingletonDAO } from "../models/Database/SingletonDAO";
import { sample_Products, sample_catsProduct, sample_subcatsProduct } from "../data";
import { Mongo_ProductSubCategory, Mongo_ProductSubCategory_Model } from "../models/Database/Mongo_ProductSubCategory";
import { Mongo_ProductCategory, Mongo_ProductCategory_Model } from "../models/Database/Mongo_ProductCategory";
import { ShopView } from "../views/ShopView";
import fileUpload from "express-fileupload";
// import { Mongo_Tag_Model } from "../models/Database/Mongo_Tag";

const router = Router()

//Seed, carga datos de los productos cuando la base de datos está vacía
router.get("/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_Product())
    SingletonDAO.getInstance().dbConnect()
    const productCount = await Mongo_Product_Model.countDocuments();
    if (productCount > 0) {
      res.send("Seed is already done")
    }else{
        sample_Products.forEach(async (product: any) => {
          console.log(product)
          const {category, subCategories, name} = product
          console.log("Category:",category,"subCategories",subCategories,"name",name)
          const categoryDB = await Mongo_ProductCategory_Model.findOne({name: category}) 
          console.log("categoryDB",categoryDB)
          if(category){
            product.category = categoryDB?.id
            console.log("product.category",product.category)
            //Filtro de subcategorias
            const subCatsDB = categoryDB?.subcategories.filter(subCat => subCategories.includes(subCat.name))
            console.log("subCatsDB",subCatsDB)
            product.subCategories = subCatsDB?.map(subCat => subCat.id)
            console.log("product.subCategories",product.subCategories)
            const nameExt = name + '.png'
            console.log("nameExt",nameExt)
            product.imageURL = `http://localhost:3000/public/${nameExt}`
            await Mongo_Product_Model.create(product)
        }
      })
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Seed, carga datos de las categorías de la tienda cuando la base de datos está vacía
router.get("/category/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory())
    SingletonDAO.getInstance().dbConnect()
    const productsCount = await Mongo_ProductCategory_Model.countDocuments()
    if (productsCount > 0) {
      res.send("Seed is already done")
    }else{
      await Mongo_ProductCategory_Model.create(sample_catsProduct);
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Seed, carga datos de las subcategorias de la tienda cuando la base de datos está vacía
router.get("/subcategory/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductSubCategory())
    SingletonDAO.getInstance().dbConnect()
    const productsCount = await Mongo_ProductSubCategory_Model.countDocuments()
    if (productsCount > 0) {
      res.send("Seed is already done")
    }else{
        sample_subcatsProduct.forEach(async (subcat: any) => {
          console.log(subcat)
          const {fromCatName, subCatName} = subcat
          const category = await Mongo_ProductCategory_Model.findOne({name: fromCatName})
          console.log("Category",category)
          if(category){

            const newSubcategory = await Mongo_ProductSubCategory_Model.create({name: subCatName})
            category.subcategories.push(newSubcategory)
            await category.save()
        }
      })
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Muestra todos los productos
router.get("/",asyncHandler(
  async (_req, res) => {
    const products = await (new ShopView().getProducts())
    res.send(products)
  })
)
//Obtiene un producto por ID
router.get("/product/:id", asyncHandler (
  async (_req,res) => {
    const product = await (new ShopView().getProductById(_req))
    res.send(product)
   }
  )
)
//Filtra productos por categoría
router.get("/bycategory/:categoryId",asyncHandler(
  async (_req, res) => {
    const products = await (new ShopView().getProductsByCategory(_req))
    res.send(products)
  })
)
//Filtra productos por subCategoría
router.get("/bysubcategory/:subcategoryId",asyncHandler(
  async (_req, res) => {
    const products = await (new ShopView().getProductsBySubCategory(_req))
    res.send(products)
  })
)
router.use(fileUpload({
  createParentPath: true
}))
//Crea un nuevo producto
router.post("/uploadproduct", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se recibieron archivos');
  }
  new ShopView().createProduct(req)
})
//Obtiene todas las categorías de la tienda, ya tienen las subcategorías
router.get("/category",asyncHandler(
  async (_req, res) => {
    const cats = await (new ShopView().getProductCategories())
    res.send(cats)
  })
)

//************************Página de compras **************/
// //Agregar al carrito
// router.post("/addcart", asyncHandler(
//   async (_req, res) => {
//     const subcat = await (new ShopView().buyConfirmation(_req))
//     res.send(subcat)
//   })
// )

//Agrega un pedido
router.post("/buy", asyncHandler(
  async (_req, res) => {
    console.log("entra", res)
    // const order = await (new ShopView().buyConfirmation(_req))
    // res.send(order)
  })
)

//************************Página de categorías **************/
//Edita una categoría
router.post("/editcat", asyncHandler(
  async (_req, res) => {
    const cat = await (new ShopView().editCategory(_req))
    res.send(cat)
  })
)
//Edita una subcategoría
router.post("/editsubcat", asyncHandler(
  async (_req, res) => {
    const subcat = await (new ShopView().editSubCategory(_req))
    res.send(subcat)
  })
)

export default router