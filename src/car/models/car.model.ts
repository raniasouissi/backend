import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Promotion } from 'src/promotion/models/promotion.model'

@Schema()
export class Car {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  brand: string

  @Prop({ required: true })
  year: number

  @Prop()
  image: string

  @Prop({ required: true })
  puissancefiscale: string

  @Prop({ default: 0 })
  prix: number
  @Prop({ required: true })
  Kilometrage: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  Carburant: string
  @Prop({ default: 'inconnu' })
  couleur: string

  @Prop({ default: false })
  estVendue: boolean
  @Prop({ default: false })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Promotion' }] })
  promotions: Promotion[]
}

export type CarDocument = Car & Document

export const CarSchema = SchemaFactory.createForClass(Car)
