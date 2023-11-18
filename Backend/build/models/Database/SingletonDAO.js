"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonDAO = void 0;
//Singleton para acceder a la base de datos
class SingletonDAO {
    constructor() {
        //Cambia el DAO al que tiene acceso el singleton
        this.setAccessDAO = (DAO) => {
            this.accessDAO = DAO;
        };
        this.getAccessDAO = () => {
            return this.accessDAO;
        };
        //Conexion a la base de datos
        this.dbConnect = () => {
            if (this.accessDAO) {
                this.accessDAO.dbConnect();
            }
            else {
                console.log("No se ha definido la base de datos a la que conectar");
            }
        };
        this.dbDisconnect = () => {
            if (this.accessDAO) {
                this.accessDAO.dbDisconnect();
            }
            else {
                console.log("No se está conectado a ninguna base de datos");
            }
        };
    }
    static getInstance() {
        if (!SingletonDAO.instance) {
            SingletonDAO.instance = new SingletonDAO();
        }
        return SingletonDAO.instance;
    }
}
exports.SingletonDAO = SingletonDAO;
