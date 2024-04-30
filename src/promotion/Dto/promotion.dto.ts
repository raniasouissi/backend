import { IsNotEmpty, IsString, IsDate, IsMongoId } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Convertit la valeur en objet Date
  startDate: Date

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Convertit la valeur en objet Date
  endDate: Date

  @IsNotEmpty()
  @IsMongoId()
  car: string // ID de la voiture concernée par la promotion (converti en chaîne de caractères)
}
