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
- API para administrar videos favoritos (crear, listar, eliminar)  

### Como ejecutar (hasta ahora)

Desde la carpeta /backend:
    npm install
    npm run dev

## Endpoints disponibles

- | GET  | /api/health        | Verificar estado del servidor |
- | POST | /api/auth/registro | Registro de nuevos usuarios |
- | POST | /api/auth/login    | Iniciar sesión y obtener token |
- | GET  | /api/auth/me       | Obtener perfil del usuario (requiere token) |

## Gestión de videos favoritos (Protegidos con JWT)

- | POST   | /api/favoritos | Agregar un video a favoritos |
- | GET    | /api/favoritos | Listar favoritos del usuario |
- | GET    | /api/favoritos?q=texto | Buscar favoritos por título o canal |
- | DELETE | /api/favoritos/:videoId | Eliminar un favorito por ID de video |

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

## Ejemplo para agregar video a favoritos

POST /api/favoritos

{
  "videoId": "dQw4w9WgXcQ",
  "titulo": "Video de prueba",
  "descripcion": "Ejemplo desde Postman",
  "canal": "Canal Demo",
  "miniaturaUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
}

## Próximos pasos
- Inicializar frontend en Angular.
- Crear componentes para registro e inicio de sesión.
- Consumir API desde Angular con servicio HTTP.
- Mostrar y gestionar favoritos desde el frontend.
- Integrar YouTube Data API para búsqueda y visualización de videos.