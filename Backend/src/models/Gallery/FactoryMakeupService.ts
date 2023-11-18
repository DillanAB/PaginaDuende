import { MakeupService } from "./MakeupService";

export class FactoryMakeupService {
    public create(jsonMakeupService:any): MakeupService{
        const {name, description, price, imageURL, category, subcategory} = jsonMakeupService
        return new MakeupService(name, price, imageURL, description, category, subcategory, [])
    }
}