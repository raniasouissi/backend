// promotion.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Car } from 'src/car/models/car.model'

@Schema()
export class Promotion extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ type: Date, required: true })
  startDate: Date

  @Prop({ type: Date, required: true })
  endDate: Date

  @Prop({ type: Types.ObjectId, ref: 'Car' })
  car: Car // Référence à l'ID de la voiture concernée par la promotion
}

export type PromotionDocument = Promotion & Document

export const PromotionSchema = SchemaFactory.createForClass(Promotion)
