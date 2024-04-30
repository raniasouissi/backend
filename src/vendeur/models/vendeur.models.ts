import { User, UserSchema } from 'src/users/models/users.models'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Roles } from 'src/auth/enum'

@Schema({ collection: 'users', timestamps: true })
export class Vendeur extends User {
  @Prop()
  phoneNumber: string

  @Prop()
  name: string
  @Prop({ default: 'vendeur' }) // Définit le rôle par défaut comme 'user'
  role: Roles
}

export type VendeurDocument = Vendeur & Document
export const VendeurSchema = SchemaFactory.createForClass(Vendeur)
