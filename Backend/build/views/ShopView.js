"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopView = void 0;
const MainController_1 = require("../controllers/MainController");
const View_1 = require("./View");
class ShopView extends View_1.View {
    constructor() {
        super();
    }
    //Obtiene todos los productos de la base de datos
    getProducts() {
        return (new MainController_1.MainController().getProducts());
    }
    //Obtiene un producto por su id
    getProductById(req) {
        const id = req.params.id;
        return (new MainController_1.MainController().getProductById(id));
    }
    //Obtiene los productos por categoría
    getProductsByCategory(req) {
        const categoryId = req.params.categoryId;
        return (new MainController_1.MainController().getProductsByCategory(categoryId));
    }
    //Obtiene los productos por subcategoría
    getProductsBySubCategory(req) {
        const subcategoryId = req.params.subcategoryId;
        return (new MainController_1.MainController().getProductsBySubCategory(subcategoryId));
    }
    //Crea un nuevo producto
    createProduct(req) {
        //Prepara la información para crear el producto
        const jsonData = JSON.parse(req.body.data);
        const image = req.files.image;
        //Llama al controlador para crear el producto
        new MainController_1.MainController().createProduct(jsonData, image);
    }
    //Obtiene las categorías de producto
    getProductCategories() {
        return (new MainController_1.MainController().getProductCategories());
    }
    //************************Página de categorías **************/
    //Edita una categoría
    editCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().editProductCategory(jsonData));
    }
    //Edita una subcategoría
    editSubCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().editProductSubCategory(jsonData));
    }
}
exports.ShopView = ShopView;
