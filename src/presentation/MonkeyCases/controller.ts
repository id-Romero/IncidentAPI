import { Request, Response } from 'express';
import { MonkeyCasesModel } from '../../data/models/monkeycases.model';
import { EmailService } from '../../domain/service/email.service';

export class MonkeyCasesController{
    public getMonkeyCases = async (req:Request, res:Response) => {
        try {
            const Mcase = await MonkeyCasesModel.find();
            res.json(Mcase);
        } catch (error) {

        }
    }

    public createMonkeyCases = async (req:Request, res:Response) => {
        try {
            const {genre, age, lat, lng, creationDate} = req.body;
            const newCase = await MonkeyCasesModel.create({
                genre, age, lat, lng, creationDate});
                // const emailService = new EmailService();
                // await emailService.sendEmail({
                //     to: "diego.lopez.ismael@gmail.com",
                //     subject: 'title',
                //     htmlBody: `<h1>${description}</h1>`
                // });
            return res.json(newCase);
        }
        catch (error) {

        }
    }

    public getMonkeyCaseById = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const Mcase = await MonkeyCasesModel.findById(id);
            res.json(Mcase);
        } catch (error) {
            return res.status(404).json({message: 'Mcase not found'});
        }
    }

    public getMonkeyCasesFromLastWeek = async (req: Request, res: Response) => {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const casesFromLastWeek = await MonkeyCasesModel.find({
                creationDate: { $gte: oneWeekAgo }
            });
            res.json(casesFromLastWeek);
        } catch (error) {
            return res.status(500).json({ message: 'Error obteniendo los datos de la otra semana' });
        }
    }

    public updateMonkeyCase = async (req:Request, res:Response) => {
        const {id} = req.params;
        const {genre, age, lat, lng, creationDate} = req.body;
        try {
            const Mcase = await MonkeyCasesModel.findByIdAndUpdate(id,{
                age,
                genre,
                lat,
                lng,
                creationDate
            });
            res.json(Mcase);
        } catch (error) {
            return res.status(404).json({message: 'Mcase not found'});
        }
    }

    public deleteMonkeyCase = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const Mcase = await MonkeyCasesModel.findByIdAndDelete(id);
            res.json({message: 'Mcase deleted'});
        } catch (error) {
            return res.status(404).json({message: 'Mcase not found'});
        }
    }
}