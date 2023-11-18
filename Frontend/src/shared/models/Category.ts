export abstract class Category {
    id!: string;
    name!: string;

    constructor(pId: string, pName: string) {
        this.id = pId;
        this.name = pName;
    }
}