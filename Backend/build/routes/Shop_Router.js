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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Mongo_Product_1 = require("../models/Database/Mongo_Product");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const data_1 = require("../data");
const Mongo_ProductSubCategory_1 = require("../models/Database/Mongo_ProductSubCategory");
const Mongo_ProductCategory_1 = require("../models/Database/Mongo_ProductCategory");
const ShopView_1 = require("../views/ShopView");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import { Mongo_Tag_Model } from "../models/Database/Mongo_Tag";
const router = (0, express_1.Router)();
//Seed, carga datos de los productos cuando la base de datos está vacía
router.get("/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Product_1.Mongo_Product());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const productCount = yield Mongo_Product_1.DAO_Product_Model.countDocuments();
    if (productCount > 0) {
        res.send("Seed is already done");
    }
    else {
        data_1.sample_Products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(product);
            const { category, subCategories, name } = product;
            console.log("Category:", category, "subCategories", subCategories, "name", name);
            const categoryDB = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.findOne({ name: category });
            console.log("categoryDB", categoryDB);
            if (category) {
                product.category = categoryDB === null || categoryDB === void 0 ? void 0 : categoryDB.id;
                console.log("product.category", product.category);
                //Filtro de subcategorias
                const subCatsDB = categoryDB === null || categoryDB === void 0 ? void 0 : categoryDB.subcategories.filter(subCat => subCategories.includes(subCat.name));
                console.log("subCatsDB", subCatsDB);
                product.subCategories = subCatsDB === null || subCatsDB === void 0 ? void 0 : subCatsDB.map(subCat => subCat.id);
                console.log("product.subCategories", product.subCategories);
                const nameExt = name + '.png';
                console.log("nameExt", nameExt);
                product.imageURL = `http://localhost:3000/public/${nameExt}`;
                yield Mongo_Product_1.DAO_Product_Model.create(product);
            }
        }));
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Seed, carga datos de las categorías de la tienda cuando la base de datos está vacía
router.get("/category/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductCategory_1.Mongo_ProductCategory());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const productsCount = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.countDocuments();
    if (productsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.create(data_1.sample_catsProduct);
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Seed, carga datos de las subcategorias de la tienda cuando la base de datos está vacía
router.get("/subcategory/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_ProductSubCategory_1.Mongo_ProductSubCategory());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const productsCount = yield Mongo_ProductSubCategory_1.Mongo_ProductSubCategory_Model.countDocuments();
    if (productsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        data_1.sample_subcatsProduct.forEach((subcat) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(subcat);
            const { fromCatName, subCatName } = subcat;
            const category = yield Mongo_ProductCategory_1.Mongo_ProductCategory_Model.findOne({ name: fromCatName });
            console.log("Category", category);
            if (category) {
                const newSubcategory = yield Mongo_ProductSubCategory_1.Mongo_ProductSubCategory_Model.create({ name: subCatName });
                category.subcategories.push(newSubcategory);
                yield category.save();
            }
        }));
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Muestra todos los productos
router.get("/", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (new ShopView_1.ShopView().getProducts());
    res.send(products);
})));
//Obtiene un producto por ID
router.get("/product/:id", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (new ShopView_1.ShopView().getProductById(_req));
    res.send(product);
})));
//Filtra productos por categoría
router.get("/bycategory/:categoryId", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (new ShopView_1.ShopView().getProductsByCategory(_req));
    res.send(products);
})));
//Filtra productos por subCategoría
router.get("/bysubcategory/:subcategoryId", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (new ShopView_1.ShopView().getProductsBySubCategory(_req));
    res.send(products);
})));
router.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
//Crea un nuevo producto
router.post("/uploadproduct", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se recibieron archivos');
    }
    new ShopView_1.ShopView().createProduct(req);
});
//Obtiene todas las categorías de la tienda, ya tienen las subcategorías
router.get("/category", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cats = yield (new ShopView_1.ShopView().getProductCategories());
    res.send(cats);
})));
//************************Página de categorías **************/
//Edita una categoría
router.post("/editcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield (new ShopView_1.ShopView().editCategory(_req));
    res.send(cat);
})));
//Edita una subcategoría
router.post("/editsubcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subcat = yield (new ShopView_1.ShopView().editSubCategory(_req));
    res.send(subcat);
})));
exports.default = router;
