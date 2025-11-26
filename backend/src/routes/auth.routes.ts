// src/routes/auth.routes.ts

import {Router} from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/auth.controller';
import { verificarToken, RequestConUsuario } from '../middleware/auth.middleware';
import { Usuario } from '../models/usuario.model';

const router = Router();

//Ruta para registrar usuarios
//Endpoint: POST /api/auth/register
router.post('/register',registrarUsuario);

//Ruta para iniciar sesion
//Endpoint: POST /api/auth/login
router.post('/login', iniciarSesion);

//Ruta protegida
router.get('/me', verificarToken, (req: RequestConUsuario, res) => {
    //Verifica el paso del middleware
    if (!req.usuario){
        return res.status(500).json({ mensaje: 'No se pudo obtener la información del usuario'});
    }

    return res.json({
        mensaje: 'Usuario autenticado',
        Usuario: req.usuario
    });
});

export default router;