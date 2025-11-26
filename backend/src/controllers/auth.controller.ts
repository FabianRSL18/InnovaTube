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

//Inicio de sesion (Login)-------------------------------------------------------------------------
export const iniciarSesion = async (req: Request, res: Response) => {
    try{
        const {identificador, contrasena} = req.body;
        //identificador = nombreUsuario o correo

        if(!identificador || !contrasena){
            return res.status(400).json({mensaje: 'Identificador y contraseña son obligatorios'});
        }

        //Buscar nombreUsuario o correo
        const usuario = await Usuario.findOne({
            $or: [
                {nombreUsuario: identificador},
                {correo: identificador}
            ]
        });

        if (!usuario){
            return res.status(401).json({mensaje: 'credenciales incorrectas'});
        }

        //Generar token JWT
        const token = jwt.sign(
            {
                uid: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                correo: usuario.correo
            },
            JWT_SECRET,
            {expiresIn: '2h'} //Tiempo de expiracion
        );

        //Responder usuario+token
        return res.status(200).json({
            mensaje: 'Inicio de Sesion exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                nombreUsuario: usuario.nombreUsuario,
                correo: usuario.correo
            }
        });
    }catch (error){
        console.error('Error en iniciarSesion:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};