// src/models/video-favorito.model.ts

import { Schema, model, Document, Types} from 'mongoose';

export interface IVideoFavorito extends Document {
    usuarioId: Types.ObjectId;   // Referencia al usuario dueño del favorito
    videoId: string;             // ID de video de YouTube
    titulo: string;
    descripcion?: string;
    canal?: string;
    miniaturaUrl?: string;
    creadoEn: Date;
}

const videoFavoritoSchema = new Schema<IVideoFavorito>({
    usuarioId:   { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    videoId:     { type: String, required: true },
    titulo:      { type: String, required: true },
    descripcion: { type: String },
    canal:       { type: String },
    miniaturaUrl:{ type: String },
    creadoEn:    { type: Date, default: Date.now }
});

// Evitar favoritos duplicados por usuario + video
videoFavoritoSchema.index({ usuarioId: 1, videoId: 1 }, { unique: true });

export const VideoFavorito = model<IVideoFavorito>('VideoFavorito', videoFavoritoSchema);