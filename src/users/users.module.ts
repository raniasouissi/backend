import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './models/users.models'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { VendeursModule } from 'src/vendeur/vendeur.module'
import { Car, CarSchema } from 'src/car/models/car.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Car.name, schema: CarSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
