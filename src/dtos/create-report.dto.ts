import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class AnswerDto {
    @IsNotEmpty()
    questionId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    answer: string;
}

export class CreateReportDto {
    @IsNotEmpty()
    evaluationId: mongoose.Schema.Types.ObjectId;

    @IsArray()
    @ValidateNested({ each: true })
    answers: AnswerDto[];
}
