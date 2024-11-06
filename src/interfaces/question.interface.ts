import mongoose from "mongoose";

export interface Question {
    text: string;
    evaluationId: mongoose.Schema.Types.ObjectId;
    scaleType: 'Likert' | 'Frecuencia' | 'Desempeño';
    options: string[];
}