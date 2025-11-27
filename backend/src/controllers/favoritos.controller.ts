// src/controllers/favoritos.controller.ts

import { Response } from 'express';
import { VideoFavorito } from '../models/video-favorito.model';
import { RequestConUsuario } from '../middleware/auth.middleware';

//Agregar un video a favoritos
export const agregarFavorito = async (req: RequestConUsuario, res: Response) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no autenticado' });
        }

        const { videoId, titulo, descripcion, canal, miniaturaUrl } = req.body;

        if (!videoId || !titulo) {
            return res.status(400).json({ mensaje: 'videoId y titulo son obligatorios' });
        }

        // Intentar crear el favorito (evitando duplicados gracias al índice único)
        try {
        const favorito = await VideoFavorito.create({
            usuarioId: usuario.uid,
            videoId,
            titulo,
            descripcion,
            canal,
            miniaturaUrl
        });

        return res.status(201).json({
            mensaje: 'Video agregado a favoritos',
            favorito
        });
        } catch (error: any) {
        // Si ya existe el favorito
        if (error.code === 11000) {
            return res.status(200).json({ mensaje: 'El video ya estaba en favoritos' });
        }
        throw error;
        }
    } catch (error) {
        console.error('Error en agregarFavorito:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Listar favoritos del usuario autenticado (con buscador opcional ?q=)
export const obtenerFavoritos = async (req: RequestConUsuario, res: Response) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no autenticado' });
        }

        const termino = (req.query.q as string) || '';

        const filtroBase: any = { usuarioId: usuario.uid };

        if (termino) {
        filtroBase.$or = [
            { titulo: { $regex: termino, $options: 'i' } },
            { canal: { $regex: termino, $options: 'i' } }
        ];
        }

        const favoritos = await VideoFavorito.find(filtroBase).sort({ creadoEn: -1 });

        return res.json({ favoritos });
    } catch (error) {
        console.error('Error en obtenerFavoritos:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Eliminar un video de favoritos por videoId
export const eliminarFavorito = async (req: RequestConUsuario, res: Response) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no autenticado' });
        }

        const { videoId } = req.params;

        if (!videoId) {
            return res.status(400).json({ mensaje: 'Se requiere el videoId' });
        }

        const resultado = await VideoFavorito.findOneAndDelete({
            usuarioId: usuario.uid,
            videoId
        });

        if (!resultado) {
            return res.status(404).json({ mensaje: 'El video no estaba en favoritos' });
        }

        return res.json({ mensaje: 'Video eliminado de favoritos' });
    } catch (error) {
        console.error('Error en eliminarFavorito:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};