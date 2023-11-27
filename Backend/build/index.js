"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Shop_Router_1 = __importDefault(require("./routes/Shop_Router"));
// import dotenv from 'dotenv'
const Gallery_Router_1 = __importDefault(require("./routes/Gallery_Router"));
const User_Router_1 = __importDefault(require("./routes/User_Router"));
const Calendar_Router_1 = __importDefault(require("./routes/Calendar_Router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/public', express_1.default.static(`${__dirname}/storage/MakeupServicesImages`));
app.use('/public', express_1.default.static(`${__dirname}/storage/ProductsImages`));
const PORT = 3000;
app.get('/', (_req, res) => {
    console.log('Página de inicio');
    res.send('Página de inicio');
});
//Inicializa el servidor
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
//CORS establece los permisos de acceso a la API
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:4200'
}));
app.use("/api/users", User_Router_1.default);
app.use("/api/gallery", Gallery_Router_1.default);
app.use('/api/shop', Shop_Router_1.default);
app.use('/api/calendar', Calendar_Router_1.default);
