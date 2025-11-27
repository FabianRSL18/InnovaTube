// src/routes/favoritos.routes.ts

import { Router } from 'express';
import { verificarToken } from '../middleware/auth.middleware';
import { agregarFavorito,obtenerFavoritos,eliminarFavorito} from '../controllers/favoritos.controller';

const router = Router();

// Todas las rutas de favoritos requieren estar autenticado
router.use(verificarToken);

// Agregar video a favoritos
router.post('/', agregarFavorito);

// Listar favoritos del usuario (con buscador ?q=termino)
router.get('/', obtenerFavoritos);

// Eliminar favorito por videoId
router.delete('/:videoId', eliminarFavorito);

export default router;