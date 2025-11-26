// src/routes/auth.routes.ts

import {Router} from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/auth.controller';

const router = Router();

//Ruta para registrar usuarios
//Endpoint: POST /api/auth/register
router.post('/register',registrarUsuario);

//Ruta para iniciar sesion (falta)
//Endpoint: POST /api/auth/login
router.post('/login', iniciarSesion);

export default router;