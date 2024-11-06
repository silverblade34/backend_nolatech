import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  departmentId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  hireDate: Date;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
