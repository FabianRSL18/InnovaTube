# InnovaTube

Ejercicio Técnico

## Estado del proyecto 
- Servidor Express funcionando con conexión a MongoDB Atlas.
- API de registro, inicio de sesión y autenticación con JWT operativa.
- Pruebas realizadas desde Postman correctamente.

## Estructura base
innovatube/  
&nbsp;&nbsp;&nbsp;&nbsp;backend/ → API con Node.js (Express + TypeScript)  
&nbsp;&nbsp;&nbsp;&nbsp;frontend/ → Aplicación Angular (pendiente de inicialización)

## Backend - Estado Actual

- Servidor Express Activo
- Conexión estable a MongoDB Atlas
- Usuarios en la BD con contraseña cifrada
- Inicio de sesión con validación de credenciales
- Generación de token JWT
- Ruta protegida para obtener perfil de usuario 

### Como ejecutar (hasta ahora)

Desde la carpeta /backend:
    npm install
    npm run dev

## Endpoints disponibles

- | GET  | /api/health        | Verificar estado del servidor |
- | POST | /api/auth/registro | Registro de nuevos usuarios |
- | POST | /api/auth/login    | Iniciar sesión y obtener token |
- | GET  | /api/auth/me       | Obtener perfil del usuario (requiere token) |

## Variables necesarias en '.env'
- PORT=3000
- MONGO_URI = link de conexión
- JWT_SECRET = clave 

## Probar autenticación en postman
1- Enviar POST a `/api/auth/login` con:
    ```json
    {
        "correo": "fabian@example.com",
        "contrasena": "12345678"
    }

2- Copiar el token que responde

3- Enviar GET a /api/auth/me
    En Headers agregar:
    Authorization: Bearer <tu_token_aquí>

## Próximos pasos
- Crear colección y modelo para videos favoritos.
- implementar API para guardar/eliminar favoritos.
- Conectar frontend Angular para registro y login.
- Integrar YouTube Data API.