import mongoose from "mongoose";

interface ConnectionOptions{
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options:ConnectionOptions) {
        try {
            await mongoose.connect(options.mongoUrl, {
                dbName: options.dbName,
            });
            console.log('Conectado a la base de datos');
        } catch (error) {
            console.error('Error connectando a la base de datos', error);
        }
    }
}