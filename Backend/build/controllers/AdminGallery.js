"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGallery = void 0;
const config_1 = require("../config");
const Mongo_MakeupCategory_1 = require("../models/Database/Mongo_MakeupCategory");
const Mongo_MakeupService_1 = require("../models/Database/Mongo_MakeupService");
const Mongo_MakeupSubCategory_1 = require("../models/Database/Mongo_MakeupSubCategory");
const Mongo_Tag_1 = require("../models/Database/Mongo_Tag");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const FactoryMakeupService_1 = require("../models/Gallery/FactoryMakeupService");
//Controlador de la galería
class AdminGallery {
    constructor() { }
    //Obtiene todos los maquillajes de la base de datos
    getMakeups() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const makeups = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return makeups;
        });
    }
    //Obtiene los maquillajes por categoría
    getMakeupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const makeup = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.findById(id);
            if (makeup === null || makeup === void 0 ? void 0 : makeup.category) {
                makeup.category = (yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findById(makeup.category));
                makeup.subCategories = (yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.find({ _id: { $in: makeup === null || makeup === void 0 ? void 0 : makeup.subCategories } }));
            }
            if (makeup === null || makeup === void 0 ? void 0 : makeup.tags)
                makeup.tags = (yield Mongo_Tag_1.Mongo_Tag_Model.find({ _id: { $in: makeup === null || makeup === void 0 ? void 0 : makeup.tags } }));
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return makeup;
        });
    }
    //Obtiene los maquillajes por categoría
    getMakeupsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const makeups = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.find({ category: categoryId });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return makeups;
        });
    }
    //Obtiene los maquillajes por subcategoría
    getMakeupsBySubCategory(subcategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const makeups = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.find({ subCategories: subcategoryId });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return makeups;
        });
    }
    //Obtiene los maquillajes por tag
    getMakeupsByTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const makeups = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.find({ tags: { $in: { _id: tagId } } });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return makeups;
        });
    }
    //Crea un maquillaje y lo sube a la base de datos
    createMakeupService(jsonMakeupService, image) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            //Revisa si existe un maquillaje con ese nombre
            const { name } = jsonMakeupService;
            const makeup = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.findOne({ name });
            if (makeup) {
                console.log("Ya existe un maquillaje con ese nombre");
            }
            else {
                //Crea el maquillaje y lo sube a la base de datos
                const { host, port } = config_1.config.appConfig;
                const varImageURL = `${host}:${port}/public/${name}` + '.' + image.mimetype.split('/')[1];
                const newJsonMakeupService = Object.assign(jsonMakeupService, { imageURL: varImageURL }); //Nuevo JSON con la URL
                const newMakeup = new FactoryMakeupService_1.FactoryMakeupService().create(newJsonMakeupService);
                const dbMakeup = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.create(newMakeup);
                console.log("Maquillaje creado");
                //Sube la imagen a la carpeta de imágenes
                if (dbMakeup) {
                    const path = `./src/storage/MakeupServicesImages/${name}` + '.' + image.mimetype.split('/')[1];
                    image.mv(path);
                    console.log("Imagen guardada");
                    return dbMakeup;
                }
            }
        });
    }
    //Obtiene las categorías de maquillaje
    getMakeupCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const categories = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return categories;
        });
    }
    //Obtiene los tags de maquillaje
    getMakeupTags() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const tags = yield Mongo_Tag_1.Mongo_Tag_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return tags;
        });
    }
    //Página de categorías
    //Edita una categoría
    editMakeupCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { id, newName } = jsonData;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findById(id);
            if (category) {
                category.name = newName;
                yield category.save();
                console.log("Categoría editada");
            }
            else {
                console.log("No existe la categoría");
            }
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return category;
        });
    }
    //Edita una subcategoría
    editMakeupSubCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { catId, id, newName } = jsonData;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findById(catId);
            if (category) {
                const subcat = yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.findById(id);
                if (subcat) {
                    subcat.name = newName;
                    yield subcat.save();
                    let subCategories = yield category.subcategories;
                    const index = subCategories.findIndex(subcat => subcat.id === id);
                    subCategories[index] = subcat;
                    yield category.save();
                    console.log("Subategoría editada");
                }
                else {
                    console.log("No existe la subcategoría");
                }
            }
            else {
                console.log("No existe la categoría");
            }
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
        });
    }
    //Crea una categoría
    createMakeupCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { name } = jsonData;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findOne({ name });
            if (category) {
                console.log("Ya existe una categoría con ese nombre");
            }
            else {
                const newCategory = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.create({ name });
                console.log("Categoría creada");
                SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
                return newCategory;
            }
        });
    }
    //Crea una subcategoría
    createMakeupSubCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { catId, name } = jsonData;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findById(catId);
            if (category) {
                const subcategory = yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.findOne({ name });
                if (subcategory) {
                    console.log("Ya existe una subcategoría con ese nombre");
                }
                else {
                    const newSubcategory = yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.create({ name });
                    category.subcategories.push(newSubcategory);
                    yield category.save();
                    console.log("Subcategoría creada");
                    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
                    return newSubcategory;
                }
            }
            else {
                console.log("No existe la categoría");
            }
        });
    }
    //Elimina una categoría
    deleteMakeupCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { id } = jsonData;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findById(id);
            if (category) {
                yield category.deleteOne();
                console.log("Categoría eliminada");
            }
            else {
                console.log("No existe la categoría");
            }
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
        });
    }
}
exports.AdminGallery = AdminGallery;
