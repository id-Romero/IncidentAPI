import {Router} from 'express';
import {Request, Response} from 'express';
import { IncidentController } from './controller';

export class IncidentRoutes{

    static get routes(): Router{
        const router = Router();
        const incidentController = new IncidentController();
        router.get("/", incidentController.getIncidents);
        router.post("/", incidentController.createIncidents);
        router.get("/:id", incidentController.getIncidentById);
        router.put("/:id", incidentController.updateIncident);
        router.delete("/:id", incidentController.deleteIncident);
        return router;
    }
}