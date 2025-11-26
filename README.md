# InnovaTube

Ejercicio Técnico

## Estado del proyecto 
Servidor Express funcionando con conexión a MongoDB Atlas.
API de registro de usuarios operativa y probada desde Postman.

## Estructura base
innovatube/
    backend/ -> API con Node.js (Express + TypeScript)
    frontend/ -> Aplicación Angular (pendiente de inicialización)

## Backend - Estado Actual

- Servidor Express Activo
- Conexión estable a MongoDB Atlas
- Usuarios en la BD
- Endpoint de prueba disponible en:
    GET /api/health
- Enpoint de registro:
    POST /api/auth/register

### Como ejecutar (hasta ahora)

Desde la carpeta /backend:
    npm install
    npm run dev

Luego comprobar en navegador o Postman:
    http://localhost:3000/api/health
    http://localhost:3000/api/auth/register

## Próximos pasos
- Implementar inicio de sesión y generación de token JWT.
- Proteger rutas privadas con middleware.
- Inicializar frontend con Angular.
- Formularios de registro/inicio de sesión integrados con el backend.
- Implementar sistema de favoritos de videos.
- Integrar YouTube Data API.