import {Router} from 'express';
import {Request, Response} from 'express';
import { MonkeyCasesController } from './controller';

export class MonkeyCasesRoutes{

    static get routes(): Router{
        const router = Router();
        const monkeyCasesController = new MonkeyCasesController();
        router.get("/", monkeyCasesController.getMonkeyCases);
        router.post("/", monkeyCasesController.createMonkeyCases);
        router.get("/:id", monkeyCasesController.getMonkeyCaseById);
        router.put("/:id", monkeyCasesController.updateMonkeyCase);
        router.delete("/:id", monkeyCasesController.deleteMonkeyCase);
        router.get('/monkeycases/lastweek', monkeyCasesController.getMonkeyCasesFromLastWeek);
        return router;
    }
}