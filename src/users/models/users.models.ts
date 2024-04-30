import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { AdminDto } from 'src/admin/Dto/admin.dto'
import { UserDto } from '../Dto/users.dto'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  static save(body: UserDto) {
    throw new Error('Method not implemented.')
  }

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: false })
  role: string

  @Prop({ default: '' })
  resetPasswordToken: string

  @Prop({ default: null })
  resetPasswordExpires: Date
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] })
  favoris: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
