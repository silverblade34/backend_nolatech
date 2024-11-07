import { IsString, IsEnum, IsArray, IsMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateEvaluationDto {
  @IsString()
  period: string;

  @IsEnum(['draft', 'submitted', 'completed'])
  status: 'draft' | 'submitted' | 'completed';

  @IsEnum(['self-assessment', 'peer-assessment', 'manager-assessment'])
  type: 'self-assessment' | 'peer-assessment' | 'manager-assessment';

  @IsMongoId()
  employeeId: mongoose.Schema.Types.ObjectId;

  @IsArray()
  evaluators: mongoose.Schema.Types.ObjectId[];
}
