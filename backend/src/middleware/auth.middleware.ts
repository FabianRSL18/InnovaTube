// src/middleware/auth.middleware.ts

import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_por_defecto';

//extendemos reques para guardar credenciales
export interface RequestConUsuario extends Request{
    usuario?: {
        uid: string;
        nombreUsuario: string;
        correo: string;
    };
}

//Middleware verica token
export const verificarToken = (
    req: RequestConUsuario,
    res: Response,
    next: NextFunction
) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({mensaje: 'No se tiene token de autenticación'});
        }

        const[tipo, token] = authHeader.split(' ');

        if (tipo !== 'Bearer' || !token){
            return res.status(401).json({mensaje: 'Formato de token no valido'});    
        }

        //Verificamos el token
        const payload = jwt.verify(token, JWT_SECRET) as {
            uid: string;
            nombreUsuario: string;
            correo: string;
        };

        //Guarda el request para después
        req.usuario = {
            uid: payload.uid,
            nombreUsuario: payload.nombreUsuario,
            correo: payload.correo
        };

        //siguiente controlador
        next();
    } catch(error){
        console.error('Erroral verificar token', error);
        return res.status(401).json({mensaje: 'Token invalido o expirado'});
    }
};