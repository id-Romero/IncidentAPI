import { MonkeyCasesModel } from "../../data/models/monkeycases.model";
import { IMonkeyCase, IMonkeyCasesDocument } from "../entities/monkeycases.entity";


export class MonkeyCasesDataSource {
    public updateMcase = async (id: string, Mcase: Partial<IMonkeyCasesDocument>) => {

        await MonkeyCasesModel.findByIdAndUpdate(id,{
            genre: Mcase.genre,
            age: Mcase.age,
            lat: Mcase.lat,
            lng: Mcase.lng,
            isSent: Mcase.isSent,
            creationDate: Mcase.creationDate
        });
    }
}
