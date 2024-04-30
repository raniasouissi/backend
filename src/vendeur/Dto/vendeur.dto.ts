import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class VendeurDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string

  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string

  readonly role: string
}
