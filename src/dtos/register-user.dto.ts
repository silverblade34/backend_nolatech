import { IsString, IsIn, MinLength, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsIn(["manager", "employee"])
  @IsNotEmpty()
  role: "manager" | "employee";
}