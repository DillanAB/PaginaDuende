import { CState } from "./CState";

import { Client } from "../Users/Client";
import { IShipping } from "./IShipping";
import { OrderDetail } from "./OrderDetail";

export class Order{
    id!: number;
    client!: Client;
    address!: string;
    receipt!: string;
    orderDetail: OrderDetail[] = [];
    shipping!: IShipping;
    state!: CState;

    addOrderDetail(orderDetail:OrderDetail): void{
        this.orderDetail.push(orderDetail);
    }
}