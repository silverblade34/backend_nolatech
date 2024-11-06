import { IsIn, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string;
    
    @IsNotEmpty()
    evaluationId: mongoose.Schema.Types.ObjectId;

    @IsIn(["Likert", "Frecuencia", "Desempeño"])
    @IsNotEmpty()
    scaleType: "Likert" | "Frecuencia" | "Desempeño";
}
