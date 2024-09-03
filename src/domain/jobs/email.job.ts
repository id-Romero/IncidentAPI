import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../service/email.service';
import { IncidentDataSource } from '../datasources/incidentdatasource';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();
    const incidentDataSource = new IncidentDataSource();
    cron.schedule('*/5 * * * * *', async () => {
        console.log('Corriendo cada 5 segundos');

        try {
            const incidents = await IncidentModel.find({isEmailSent: false});
            if (!incidents.length) {
                console.log("No hay incidentes pendientes de enviar");
                return;
            };

            console.log(`Procesando ${incidents.length} incidentes`);

            await Promise.all(
                incidents.map(async (incident) => {
                    const htmlBody = generateIncidentEmailTemplate(
                        incident.title, incident.description, incident.lat, incident.lng
                    );
                    await emailService.sendEmail({
                        to: "diego.lopez.ismael@gmail.com",
                        subject: `Incidente: ${incident.description}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Correo enviado para el incidente con ID: ${incident._id}`);
                    await incidentDataSource.updateIncident(incident._id.toString(), {...incident, isEmailSent: true});
                    console.log(`Incidente con ID: ${incident._id} actualizado`);

            }));

        } catch (error) {
            console.log(error, "Error durante el trabajo de envio de correos");
        }
    });
}