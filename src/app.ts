import express,{Request, Response} from 'express';
import envs from './config/envs';
import { mongo } from 'mongoose';
import { MongoDatabase } from './data/init';
import { MonkeyCasesModel } from './data/models/monkeycases.model';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);
console.log(envs.PORT);

(async () =>
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    }))
();

app.listen(3002, () => {
    console.log('Server is running on port 3000');
    emailJob();
});