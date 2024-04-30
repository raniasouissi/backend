import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CarDto {
  @IsNotEmpty()
  @IsString()
  brand: string

  @IsNotEmpty()
  @IsString()
  model: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  kilometrage: string // Add the category property
}
