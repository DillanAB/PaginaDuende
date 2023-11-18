"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryView = void 0;
const View_1 = require("./View");
const MainController_1 = require("../controllers/MainController");
class GalleryView extends View_1.View {
    constructor() {
        super();
    }
    //Obtiene todos los maquillajes de la base de datos
    getMakeups() {
        return (new MainController_1.MainController().getMakeups());
    }
    //Obtiene un maquillaje por su id
    getMakeupById(req) {
        const id = req.params.id;
        return (new MainController_1.MainController().getMakeupById(id));
    }
    //Obtiene los maquillajes por categoría
    getMakeupsByCategory(req) {
        const categoryId = req.params.categoryId;
        return (new MainController_1.MainController().getMakeupsByCategory(categoryId));
    }
    //Obtiene los maquillajes por subcategoría
    getMakeupsBySubCategory(req) {
        const subcategoryId = req.params.subcategoryId;
        return (new MainController_1.MainController().getMakeupsBySubCategory(subcategoryId));
    }
    //Obtiene los maquillajes por tag
    getMakeupsByTag(req) {
        const tagId = req.params.tagId;
        return (new MainController_1.MainController().getMakeupsByTag(tagId));
    }
    //Crea un nuevo maquillaje
    createMakeupService(req) {
        //Prepara la información para crear el maquillaje
        const jsonData = JSON.parse(req.body.data);
        const image = req.files.image;
        //Llama al controlador para crear el maquillaje
        new MainController_1.MainController().createMakeupService(jsonData, image);
    }
    //Obtiene las categorías de maquillaje
    getMakeupCategories() {
        return (new MainController_1.MainController().getMakeupCategories());
    }
    //Obtiene los tags de maquillaje
    getMakeupTags() {
        return (new MainController_1.MainController().getMakeupTags());
    }
    //************************Página de categorías **************/
    //Edita una categoría
    editCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().editMakeupCategory(jsonData));
    }
    //Edita una subcategoría
    editSubCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().editMakeupSubCategory(jsonData));
    }
    //Crea una categoría
    createCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().createMakeupCategory(jsonData));
    }
    createSubCategory(req) {
        const jsonData = req.body;
        return (new MainController_1.MainController().createMakeupSubCategory(jsonData));
    }
}
exports.GalleryView = GalleryView;
