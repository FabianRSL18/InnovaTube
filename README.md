# InnovaTube

Ejercicio Técnico

## Estado del proyecto 
Servidor Express inicial configurado y en funcionamiento

## Estructura base
innovatube/
    backend/ -> API con Node.js (Express + TypeScript)
    frontend/ -> Aplicación Angular (pendiente de inicialización)

## Backend - Estado Actual

- Servidor Express funcionando
- Endpoint de prueba disponible en:
    GET /api/health

### Como ejecutar (hasta ahora)

Desde la carpeta /backend:
    npm install
    npm run dev

Luego comprobar en navegador o Postman:
    http://localhost:3000/api/health

## Próximos pasos
- Configurar conexión a base de datos en backend.
- Crear modelos y API de autenticación (registro/login).
- Configurar Angular en frontend.
- Integrar YouTube Data API.