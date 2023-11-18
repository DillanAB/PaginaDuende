import { CState } from "../enum/CState";
import { Client } from "./Client";
import { IShipping } from "../../interfaces/IShipping";
import { OrderDetail } from "./OrderDetail";

export class Order{
    id!: number;
    client!: Client;
    address!: string;
    receipt!: string;
    orderDetail: OrderDetail[] = [];
    shipping!: IShipping;
    state!: CState;
}