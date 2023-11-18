import { Router } from "express";
import { sample_cats, sample_makeupServices, sample_subcats, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { Mongo_MakeupService_Model, Mongo_MakeupService } from "../models/Database/Mongo_MakeupService";
import { SingletonDAO } from "../models/Database/SingletonDAO";
import fileUpload from 'express-fileupload'
import { GalleryView } from "../views/GalleryView";
import { Mongo_Tag, Mongo_Tag_Model } from "../models/Database/Mongo_Tag";
import { Mongo_MakeupSubCategory, Mongo_MakeupSubCategory_Model } from "../models/Database/Mongo_MakeupSubCategory";
import { Mongo_MakeupCategory, Mongo_MakeupCategory_Model } from "../models/Database/Mongo_MakeupCategory";

const router = Router();

//Seed, carga datos de los maquillajes cuando la base de datos está vacía
router.get("/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService())
    SingletonDAO.getInstance().dbConnect()
    const makeupsCount = await Mongo_MakeupService_Model.countDocuments();
    if (makeupsCount > 0) {
      res.send("Seed is already done")
    }else{
        sample_makeupServices.forEach(async (makeup: any) => {
          console.log(makeup)
          const {category, subCategories, tags, name} = makeup
          const categoryDB = await Mongo_MakeupCategory_Model.findOne({name: category})
          if(category){
            
            makeup.category = categoryDB?.id
            //Filtro de subcategorias
            const subCatsDB = categoryDB?.subcategories.filter(subCat => subCategories.includes(subCat.name))
            makeup.subCategories = subCatsDB?.map(subCat => subCat.id)
            const tagsDB = await Mongo_Tag_Model.find({name: {$in: tags}})
            makeup.tags = tagsDB.map(tag => tag.id)
            const nameExt = name + '.png'
            makeup.imageURL = `http://localhost:3000/public/${nameExt}`
            await Mongo_MakeupService_Model.create(makeup)
        }
      })
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Seed, carga datos de las categorías de la galería cuando la base de datos está vacía
router.get("/category/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory())
    SingletonDAO.getInstance().dbConnect()
    const makeupsCount = await Mongo_MakeupCategory_Model.countDocuments()
    if (makeupsCount > 0) {
      res.send("Seed is already done")
    }else{
      await Mongo_MakeupCategory_Model.create(sample_cats);
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Seed, carga datos de las subcategorias de la galería cuando la base de datos está vacía
router.get("/subcategory/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupSubCategory())
    SingletonDAO.getInstance().dbConnect()
    const makeupsCount = await Mongo_MakeupSubCategory_Model.countDocuments()
    if (makeupsCount > 0) {
      res.send("Seed is already done")
    }else{
        sample_subcats.forEach(async (subcat: any) => {
          console.log(subcat)
          const {fromCatName, subCatName} = subcat
          const category = await Mongo_MakeupCategory_Model.findOne({name: fromCatName})
          if(category){

            const newSubcategory = await Mongo_MakeupSubCategory_Model.create({name: subCatName})
            category.subcategories.push(newSubcategory)
            await category.save()
        }
      })
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Seed, carga datos de los tags de la galería cuando la base de datos está vacía
router.get("/tag/seed", asyncHandler(
  async (_req, res) => {
    SingletonDAO.getInstance().setAccessDAO(new Mongo_Tag())
    SingletonDAO.getInstance().dbConnect()
    const makeupsCount = await Mongo_Tag_Model.countDocuments();
    if (makeupsCount > 0) {
      res.send("Seed is already done")
    }else{
      await Mongo_Tag_Model.create(sample_tags);
      res.send("Seed is done");
    }
    SingletonDAO.getInstance().dbDisconnect()
  })
)

//Muestra todos los servicios de maquillaje
router.get("/",asyncHandler(
  async (_req, res) => {
    const makeups = await (new GalleryView().getMakeups())
    res.send(makeups)
  })
)
//Obtiene un maquillaje por ID
router.get("/makeup/:id", asyncHandler (
  async (_req,res) => {
    const makeup = await (new GalleryView().getMakeupById(_req))
    res.send(makeup)
   }
  )
)
//Filtra maquillajes por categoría
router.get("/bycategory/:categoryId",asyncHandler(
  async (_req, res) => {
    const makeups = await (new GalleryView().getMakeupsByCategory(_req))
    res.send(makeups)
  })
)
//Filtra maquillajes por subCategoría
router.get("/bysubcategory/:subcategoryId",asyncHandler(
  async (_req, res) => {
    const makeups = await (new GalleryView().getMakeupsBySubCategory(_req))
    res.send(makeups)
  })
)
//Obtiene todos los maquillajes de un tag en específico
router.get("/bytag/:tagId",asyncHandler(
  async (_req, res) => {
    const makeups = await (new GalleryView().getMakeupsByTag(_req))
    res.send(makeups)
  })
)
router.use(fileUpload({
  createParentPath: true
}))
//Crea un nuevo servicio de maquillaje
router.post("/uploadmakeup", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se recibieron archivos');
  }
  new GalleryView().createMakeupService(req)
})
//Obtiene todas las categorías de la galería, ya tienen las subcategorías
router.get("/category",asyncHandler(
  async (_req, res) => {
    const cats = await (new GalleryView().getMakeupCategories())
    res.send(cats)
  })
)
//Muestra todos los tags de la galería
router.get("/tags",asyncHandler(
  async (_req, res) => {
    const tags = await (new GalleryView().getMakeupTags())
    res.send(tags)
  })
)


//************************Página de categorías **************/
//Edita una categoría
router.post("/editcat", asyncHandler(
  async (_req, res) => {
    const cat = await (new GalleryView().editCategory(_req))
    res.send(cat)
  })
)
//Edita una subcategoría
router.post("/editsubcat", asyncHandler(
  async (_req, res) => {
    const subcat = await (new GalleryView().editSubCategory(_req))
    res.send(subcat)
  })
)
//Crea una categoría
router.post("/createcat", asyncHandler(
  async (_req, res) => {
    const cat = await (new GalleryView().createCategory(_req))
    res.send(cat)
  })
)
//Crea una subcategoría
router.post("/createsubcat", asyncHandler(
  async (_req, res) => {
    const subcat = await (new GalleryView().createSubCategory(_req))
    res.send(subcat)
  })
)

export default router