import cron from 'node-cron';
import { MonkeyCasesModel } from '../../data/models/monkeycases.model';
import { EmailService } from '../service/email.service';
import { MonkeyCasesDataSource } from '../datasources/monkeycasesdatasource';
import { generateMonkeyCasesEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();
    const monkeycasesDataSource = new MonkeyCasesDataSource();
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Corriendo cada 10 segundos');

        try {
            const Mcase = await MonkeyCasesModel.find({isEmailSent: false});
            if (!Mcase.length) {
                console.log("No hay casos de viruela del mono pendientes de enviar");
                return;
            };

            console.log(`Procesando ${Mcase.length} casos de viruela del mono`);

            await Promise.all(
                Mcase.map(async (Mcase) => {
                    const htmlBody = generateMonkeyCasesEmailTemplate(
                        Mcase.genre, Mcase.age, Mcase.lat, Mcase.lng,  Mcase.creationDate || new Date()
                    );
                    await emailService.sendEmail({
                        to: "diego.lopez.ismael@gmail.com",
                        subject: `Caso de Viruela del Mono: ${Mcase.genre} ${Mcase.age}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Correo enviado para el caso de viruela del Mono con ID: ${Mcase._id}`);
                    await monkeycasesDataSource.updateMcase(Mcase._id.toString(), {
                        ...Mcase.toObject(),
                        isSent: true,
                        creationDate: Mcase.creationDate ? new Date(Mcase.creationDate) : undefined
                    });
                    console.log(`Caso de viruela del mono con ID: ${Mcase._id} actualizado`);

            }));

        } catch (error) {
            console.log(error, "Error durante el trabajo de envio de correos");
        }
    });
}