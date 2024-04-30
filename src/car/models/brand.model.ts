// brand.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BrandDocument = Brand & Document

@Schema()
export class Brand {
  static findOne(arg0: { _id: Brand }) {
    throw new Error('Method not implemented.')
  }
  @Prop({ required: true, unique: true })
  name: string
}

export const BrandSchema = SchemaFactory.createForClass(Brand)
