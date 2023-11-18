import { DAO } from "./DAO";

//Singleton para acceder a la base de datos
export class SingletonDAO {
    private static instance: SingletonDAO;
    //DAO al que tiene acceso el singleton
    private accessDAO!: DAO

    private constructor() {}

    public static getInstance(): SingletonDAO {
        if (!SingletonDAO.instance) {
            SingletonDAO.instance = new SingletonDAO();
        }
        return SingletonDAO.instance;
    }

    //Cambia el DAO al que tiene acceso el singleton
    setAccessDAO = (DAO:DAO) => {
        this.accessDAO = DAO;
    }

    public getAccessDAO = () => {
        return this.accessDAO;
    }

    //Conexion a la base de datos
    public dbConnect = () => {
        if(this.accessDAO){
            this.accessDAO.dbConnect();
        }
        else{
            console.log("No se ha definido la base de datos a la que conectar");
        }
    }

    public dbDisconnect = () => {
        if(this.accessDAO){
            this.accessDAO.dbDisconnect();
        }
        else{
            console.log("No se está conectado a ninguna base de datos");
        }
    }
}