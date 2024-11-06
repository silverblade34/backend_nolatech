import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
