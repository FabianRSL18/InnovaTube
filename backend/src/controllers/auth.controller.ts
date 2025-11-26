// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';

//Clave para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secreto por defecto';

//Controlador para registrar usuarios
export const registrarUsuario = async (req: Request, res: Response) =>{
    try{
        const{
            nombre,
            apellido,
            nombreUsuario,
            correo,
            contrasena,
            confirmarContrasena
        } = req.body;

        //Validación de campos
        if(!nombre || !apellido || !nombreUsuario || !Usuario || !correo || !contrasena || !confirmarContrasena ){
            return res.status(400).json({mensaje: 'Todos los campos son obligatorios'});
        }

        //Contraseñas coincidan
        if (contrasena !== confirmarContrasena){
            return res.status(400).json({mensaje: 'Las contraseñas no coinciden'});
        }

        // Verificar si ya existe un usuario con el mismo correo o nombre de usuario
        const usuarioExistente = await Usuario.findOne({
            $or: [{ correo }, { nombreUsuario }]
        });

        if (usuarioExistente) {
            return res.status(409).json({ mensaje: 'El nombre de usuario o correo ya están registrados' });
        }

        //Encriptado de contrasena
        const passwordHash = await bcrypt.hash(contrasena, 10);

        // Crear el usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            nombreUsuario,
            correo,
            passwordHash
        });

        // Responder sin incluir datos sensibles
        return res.status(201).json({
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            nombreUsuario: nuevoUsuario.nombreUsuario,
            correo: nuevoUsuario.correo
        });
    } catch (error){
        console.error('Error en registrarUsuario', error);
        return res.status(500).json({mensaje: 'Error interno del servidor'});
    }
};

// Controlador para iniciar sesión (lo implementaremos después)
export const iniciarSesion = async (_req: Request, res: Response) => {
    return res.status(501).json({ mensaje: 'Endpoint de inicio de sesión aún no implementado' });
};