import { OrderDetail } from "src/shared/models/OrderDetail"

export interface ICreateOrder {
    clientId: string;
    cartId: string
    provincia: string ;
    canton: string;
    distrito: string;
    detalles: string;	
    telefono: number;
}