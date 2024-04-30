import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PromotionController } from './promotion.controller'
import { PromotionService } from './promotion.service'
import { Promotion, PromotionSchema } from './models/promotion.model'
import { CarModule } from 'src/car/car.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
    CarModule, // Assuming you have a CarModule for handling cars
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService], // If you need to use the PromotionService in other modules
})
export class PromotionModule {}
