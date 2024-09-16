import {Router} from 'express';
import { MonkeyCasesRoutes } from './MonkeyCases/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/monkeycases", MonkeyCasesRoutes.routes);
        return router
    }
}