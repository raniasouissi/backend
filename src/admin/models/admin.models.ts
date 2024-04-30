import { User, UserSchema } from 'src/users/models/users.models'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Roles } from 'src/auth/enum'

@Schema({ collection: 'users', timestamps: true })
export class Admin extends User {
  @Prop({ default: 'admin' }) // Définit le rôle par défaut comme 'admin'
  role: Roles
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
