import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmpty,
} from "class-validator";
import { Roles } from "../enum";

export class SignUpDto {
  @IsEmpty()
  readonly role: Roles;
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter correct email" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
