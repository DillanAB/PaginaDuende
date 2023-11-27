import { CState } from "./CState";
import { IShipping } from "./IShipping";
import { OrderDetail } from "./OrderDetail";

export class Order{
    id!: string;
    clientId!: string;
    provincia!: string ;
    canton!: string;
    distrito!: string;
    detalles!: string;	
    telefono!: number;
    receiptURL!: string;
    orderDetail!: OrderDetail[];
    shipping!: IShipping;
    state!: CState;
    // ticketURL!: string;
    // price!: number;

    constructor(id: string, clientId: string, provincia: string, canton: string,
        distrito: string, detalles: string, telefono: number, receipt: string,
        orderDetail: OrderDetail[], shipping: IShipping, state: CState){
        this.id = id;
        this.clientId = clientId;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.detalles = detalles;
        this.telefono = telefono;
        this.receiptURL = receipt;
        this.orderDetail = orderDetail;
        this.shipping = shipping;
        this.state = state;
    }
    

    addOrderDetail(orderDetail:OrderDetail): void{
        this.orderDetail.push(orderDetail);
    }
}