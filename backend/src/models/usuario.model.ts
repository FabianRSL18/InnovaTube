// src/models/usuario.model.ts

import { Schema, model, Document} from 'mongoose';

//Interfaz para ingresar datos de usuario
export interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    correo: string;
    passwordHash: string;
    creadoEn: Date;
}

//Esquema usuario en la base de datos
const usuarioSchema = new Schema<IUsuario>({
    nombre:         { type: String, required: true},
    apellido:       { type: String, required: true},
    nombreUsuario:  { type: String, required: true, unique: true},
    correo:         { type: String, required: true, unique: true},
    passwordHash:   { type: String, required: true},
    creadoEn:       { type: Date, default: Date.now},
});

//Exportacion para controladores y servicios
export const Usuario = model<IUsuario>('Usuario', usuarioSchema);