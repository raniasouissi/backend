// vendeurs.module.ts
import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VendeursController } from './vendeur.controller'
import { VendeursService } from './vendeur.service'
import { Vendeur, VendeurSchema } from './models/vendeur.models'
import { UsersModule } from 'src/users/users.module'
import { AppModule } from 'src/app.module'
import { User, UserSchema } from 'src/users/models/users.models'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendeur.name, schema: VendeurSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [VendeursController],
  providers: [VendeursService],
})
export class VendeursModule {}
