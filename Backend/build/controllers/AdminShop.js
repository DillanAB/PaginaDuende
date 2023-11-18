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
exports.AdminShop = void 0;
const config_1 = require("../config");
const Mongo_Product_1 = require("../models/Database/Mongo_Product");
const Mongo_ProductCategory_1 = require("../models/Database/Mongo_ProductCategory");
const Mongo_ProductSubCategory_1 = require("../models/Database/Mongo_ProductSubCategory");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const FactoryProduct_1 = require("../models/Shop/FactoryProduct");
class AdminShop {
    constructor() { }
    //Obtiene todos los productos de la base de datos
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const products = yield Mongo_Product_1.DAO_Product_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return products;
        });
    }
    //Obtiene los productos por categoría
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const product = yield Mongo_Product_1.DAO_Product_Model.findById(id);
            if (product === null || product === void 0 ? void 0 : product.category) {
                product.category = (yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.findById(product.category));
                product.subCategories = (yield Mongo_ProductSubCategory_1.Mongo_ProductSubCategory_Model.find({ _id: { $in: product === null || product === void 0 ? void 0 : product.subCategories } }));
            }
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return product;
        });
    }
    //Obtiene los productos por categoría
    getProductsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const products = yield Mongo_Product_1.DAO_Product_Model.find({ category: categoryId });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return products;
        });
    }
    //Obtiene los productos por subcategoría
    getProductsBySubCategory(subcategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const products = yield Mongo_Product_1.DAO_Product_Model.find({ subCategories: subcategoryId });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return products;
        });
    }
    //Crea un producto y lo sube a la base de datos
    createProduct(jsonProductService, image) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            //Revisa si existe un producto con ese nombre
            const { name } = jsonProductService;
            const product = yield Mongo_Product_1.DAO_Product_Model.findOne({ name });
            if (product) {
                console.log("Ya existe un maquillaje con ese nombre");
            }
            else {
                //Crea el producto y lo sube a la base de datos
                const { host, port } = config_1.config.appConfig;
                const varImageURL = `${host}:${port}/public/${name}` + '.' + image.mimetype.split('/')[1];
                const newJsonProduct = Object.assign(jsonProductService, { imageURL: varImageURL }); //Nuevo JSON con la URL
                const newProduct = new FactoryProduct_1.FactoryProduct().create(newJsonProduct);
                const dbProduct = yield Mongo_Product_1.DAO_Product_Model.create(newProduct);
                console.log("Producto creado");
                //Sube la imagen a la carpeta de imágenes
                if (dbProduct) {
                    const path = `./src/storage/ProductsImages/${name}` + '.' + image.mimetype.split('/')[1];
                    image.mv(path);
                    console.log("Imagen guardada");
                    return dbProduct;
                }
            }
        });
    }
    //Obtiene las categorías de la tienda
    getProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory_1.Mongo_ProductCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const categories = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return categories;
        });
    }
    //Página de categorías
    //Edita una categoría
    editCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory_1.Mongo_ProductCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { id, newName } = jsonData;
            const category = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.findById(id);
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
    editSubCategory(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory_1.Mongo_ProductCategory());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { catId, id, newName } = jsonData;
            const category = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.findById(catId);
            if (category) {
                const subcat = yield Mongo_ProductSubCategory_1.Mongo_ProductSubCategory_Model.findById(id);
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
}
exports.AdminShop = AdminShop;
