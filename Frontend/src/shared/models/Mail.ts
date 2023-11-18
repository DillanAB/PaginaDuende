import { IShipping } from "../../interfaces/IShipping";

export class Mail implements IShipping{
    getCost(): number {
        return 0; // FALTA IMPLEMENTACION
    }

    getDeliveryDate(): string {
        return ""; // FALTA IMPLEMENTACION
    }
}