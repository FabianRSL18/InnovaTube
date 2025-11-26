// src/server.ts

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db'; // Función para realizar conexión a la bd

const app = express();

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/api/health', (_req, res) => {
    // Respuesta simple para comprobar que la API está viva
    res.json({ status: 'ok', message: 'API Innovatube funcionando' });
});

// Puerto de escucha (puede venir de .env o usar 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Se realiza conexión a la base y se inicia el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
});
