"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const AdminGallery_1 = require("./AdminGallery");
const AdminShop_1 = require("./AdminShop");
const AdminUser_1 = require("./AdminUser");
class MainController {
    constructor() {
        this.adminUser = new AdminUser_1.AdminUser();
        this.adminGallery = new AdminGallery_1.AdminGallery();
        this.adminShop = new AdminShop_1.AdminShop();
    }
    //****************Gallery*******************
    //Obtiene todos los maquillajes de la base de datos
    getMakeups() {
        return (this.adminGallery.getMakeups());
    }
    //Obtiene un maquillaje por su id
    getMakeupById(id) {
        return (this.adminGallery.getMakeupById(id));
    }
    //Obtiene los maquillajes por categoría
    getMakeupsByCategory(categoryId) {
        return (this.adminGallery.getMakeupsByCategory(categoryId));
    }
    //Obtiene los maquillajes por subcategoría
    getMakeupsBySubCategory(subcategoryId) {
        return (this.adminGallery.getMakeupsBySubCategory(subcategoryId));
    }
    //Obtiene los maquillajes por tag
    getMakeupsByTag(tagId) {
        return (this.adminGallery.getMakeupsByTag(tagId));
    }
    //Crea un nuevo maquillaje
    createMakeupService(jsonMakeupService, image) {
        return (this.adminGallery.createMakeupService(jsonMakeupService, image));
    }
    //Obtiene las categorías de maquillaje
    getMakeupCategories() {
        return (this.adminGallery.getMakeupCategories());
    }
    //Obtiene los tags de maquillaje
    getMakeupTags() {
        return (this.adminGallery.getMakeupTags());
    }
    //Página de categorías
    //Edita una categoría
    editMakeupCategory(jsonData) {
        return (this.adminGallery.editMakeupCategory(jsonData));
    }
    //Edita una subcategoría
    editMakeupSubCategory(jsonData) {
        return (this.adminGallery.editMakeupSubCategory(jsonData));
    }
    //Crea una categoría
    createMakeupCategory(jsonData) {
        return (this.adminGallery.createMakeupCategory(jsonData));
    }
    createMakeupSubCategory(jsonData) {
        return (this.adminGallery.createMakeupSubCategory(jsonData));
    }
    //****************Shop*******************
    //Obtiene todos los productos de la base de datos
    getProducts() {
        return (this.adminShop.getProducts());
    }
    //Obtiene un producto por su id
    getProductById(id) {
        return (this.adminShop.getProductById(id));
    }
    //Obtiene los productos por categoría
    getProductsByCategory(categoryId) {
        return (this.adminShop.getProductsByCategory(categoryId));
    }
    //Obtiene los productos por subcategoría
    getProductsBySubCategory(subcategoryId) {
        return (this.adminShop.getProductsBySubCategory(subcategoryId));
    }
    //Crea un nuevo producto
    createProduct(jsonMakeupService, image) {
        return (this.adminShop.createProduct(jsonMakeupService, image));
    }
    //Obtiene las categorías de producto
    getProductCategories() {
        return (this.adminShop.getProductCategories());
    }
    //Página de categorías
    //Edita una categoría
    editProductCategory(jsonData) {
        return (this.adminShop.editCategory(jsonData));
    }
    //Edita una subcategoría
    editProductSubCategory(jsonData) {
        return (this.adminShop.editSubCategory(jsonData));
    }
    //****************Users*******************
    login(jsonUser) {
        return (this.adminUser.login(jsonUser));
    }
    register(jsonUser) {
        return (this.adminUser.register(jsonUser));
    }
}
exports.MainController = MainController;
