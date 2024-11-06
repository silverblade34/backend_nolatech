import { IsString, IsEnum, IsArray, IsMongoId } from "class-validator";

export class CreateEvaluationDto {
  @IsString()
  period: string;

  @IsEnum(['draft', 'submitted', 'completed'])
  status: 'draft' | 'submitted' | 'completed';

  @IsEnum(['self-assessment', 'peer-assessment', 'manager-assessment'])
  type: 'self-assessment' | 'peer-assessment' | 'manager-assessment';

  @IsMongoId()
  employeeId: string;

  @IsArray()
  evaluators: string[];
}
