"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO_Mongo = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DAO_1 = require("./DAO");
class DAO_Mongo extends DAO_1.DAO {
    constructor() {
        super();
        this.isConnect = false;
        //Conexion a la base de datos MongoDB
        this.dbConnect = () => {
            (0, mongoose_1.connect)(this.connectionURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => console.log("Connected to MongoDB"), (error) => console.log(error));
        };
        this.dbDisconnect = () => {
            if (this.isConnect) {
                mongoose_1.default.connection.close();
                console.log("Disconnected from MongoDB");
            }
            else {
                console.log("No se está conectado a ninguna base de datos");
            }
        };
        const URL = "mongodb+srv://Admin:Duende-GR2-8@duendedb.77ombjt.mongodb.net/App?retryWrites=true&w=majority";
        this.connectionURL = URL;
    }
}
exports.DAO_Mongo = DAO_Mongo;
