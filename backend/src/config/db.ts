// src/config/db.ts

import mongoose from 'mongoose';

// Función para conectar a la base de datos MongoDB
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI as string;

        // Validar que la URI exista en las variables de entorno
        if (!uri) {
            throw new Error('MONGO_URI no está definida en el archivo .env');
        }

        // Intentar conexión con MongoDB
        await mongoose.connect(uri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        // Si no hay conexión, se termina la aplicación
        process.exit(1);
    }
};