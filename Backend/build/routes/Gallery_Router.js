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
const data_1 = require("../data");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Mongo_MakeupService_1 = require("../models/Database/Mongo_MakeupService");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const GalleryView_1 = require("../views/GalleryView");
const Mongo_Tag_1 = require("../models/Database/Mongo_Tag");
const Mongo_MakeupSubCategory_1 = require("../models/Database/Mongo_MakeupSubCategory");
const Mongo_MakeupCategory_1 = require("../models/Database/Mongo_MakeupCategory");
const router = (0, express_1.Router)();
//Seed, carga datos de los maquillajes cuando la base de datos está vacía
router.get("/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupService_1.Mongo_MakeupService());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const makeupsCount = yield Mongo_MakeupService_1.Mongo_MakeupService_Model.countDocuments();
    if (makeupsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        data_1.sample_makeupServices.forEach((makeup) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(makeup);
            const { category, subCategories, tags, name } = makeup;
            const categoryDB = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findOne({ name: category });
            if (category) {
                makeup.category = categoryDB === null || categoryDB === void 0 ? void 0 : categoryDB.id;
                //Filtro de subcategorias
                const subCatsDB = categoryDB === null || categoryDB === void 0 ? void 0 : categoryDB.subcategories.filter(subCat => subCategories.includes(subCat.name));
                makeup.subCategories = subCatsDB === null || subCatsDB === void 0 ? void 0 : subCatsDB.map(subCat => subCat.id);
                const tagsDB = yield Mongo_Tag_1.Mongo_Tag_Model.find({ name: { $in: tags } });
                makeup.tags = tagsDB.map(tag => tag.id);
                const nameExt = name + '.png';
                makeup.imageURL = `http://localhost:3000/public/${nameExt}`;
                yield Mongo_MakeupService_1.Mongo_MakeupService_Model.create(makeup);
            }
        }));
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Seed, carga datos de las categorías de la galería cuando la base de datos está vacía
router.get("/category/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupCategory_1.Mongo_MakeupCategory());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const makeupsCount = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.countDocuments();
    if (makeupsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.create(data_1.sample_cats);
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Seed, carga datos de las subcategorias de la galería cuando la base de datos está vacía
router.get("/subcategory/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const makeupsCount = yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.countDocuments();
    if (makeupsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        data_1.sample_subcats.forEach((subcat) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(subcat);
            const { fromCatName, subCatName } = subcat;
            const category = yield Mongo_MakeupCategory_1.Mongo_MakeupCategory_Model.findOne({ name: fromCatName });
            if (category) {
                const newSubcategory = yield Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Model.create({ name: subCatName });
                category.subcategories.push(newSubcategory);
                yield category.save();
            }
        }));
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Seed, carga datos de los tags de la galería cuando la base de datos está vacía
router.get("/tag/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Tag_1.Mongo_Tag());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const makeupsCount = yield Mongo_Tag_1.Mongo_Tag_Model.countDocuments();
    if (makeupsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        yield Mongo_Tag_1.Mongo_Tag_Model.create(data_1.sample_tags);
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
//Muestra todos los servicios de maquillaje
router.get("/", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const makeups = yield (new GalleryView_1.GalleryView().getMakeups());
    res.send(makeups);
})));
//Obtiene un maquillaje por ID
router.get("/makeup/:id", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const makeup = yield (new GalleryView_1.GalleryView().getMakeupById(_req));
    res.send(makeup);
})));
//Filtra maquillajes por categoría
router.get("/bycategory/:categoryId", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const makeups = yield (new GalleryView_1.GalleryView().getMakeupsByCategory(_req));
    res.send(makeups);
})));
//Filtra maquillajes por subCategoría
router.get("/bysubcategory/:subcategoryId", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const makeups = yield (new GalleryView_1.GalleryView().getMakeupsBySubCategory(_req));
    res.send(makeups);
})));
//Obtiene todos los maquillajes de un tag en específico
router.get("/bytag/:tagId", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const makeups = yield (new GalleryView_1.GalleryView().getMakeupsByTag(_req));
    res.send(makeups);
})));
router.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
//Crea un nuevo servicio de maquillaje
router.post("/uploadmakeup", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se recibieron archivos');
    }
    new GalleryView_1.GalleryView().createMakeupService(req);
});
//Obtiene todas las categorías de la galería, ya tienen las subcategorías
router.get("/category", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cats = yield (new GalleryView_1.GalleryView().getMakeupCategories());
    res.send(cats);
})));
//Muestra todos los tags de la galería
router.get("/tags", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield (new GalleryView_1.GalleryView().getMakeupTags());
    res.send(tags);
})));
//************************Página de categorías **************/
//Edita una categoría
router.post("/editcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield (new GalleryView_1.GalleryView().editCategory(_req));
    res.send(cat);
})));
//Edita una subcategoría
router.post("/editsubcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subcat = yield (new GalleryView_1.GalleryView().editSubCategory(_req));
    res.send(subcat);
})));
//Crea una categoría
router.post("/createcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield (new GalleryView_1.GalleryView().createCategory(_req));
    res.send(cat);
})));
//Crea una subcategoría
router.post("/createsubcat", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subcat = yield (new GalleryView_1.GalleryView().createSubCategory(_req));
    res.send(subcat);
})));
exports.default = router;
