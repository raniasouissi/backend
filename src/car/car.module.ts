import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { CarsController } from './car.controller'
import { CarsService } from './car.service'
import { Car, CarSchema } from './models/car.model'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { PromotionModule } from 'src/promotion/promotion.module'
import {
  Promotion,
  PromotionSchema,
} from 'src/promotion/models/promotion.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Promotion.name, schema: PromotionSchema },
    ]),

    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Dossier où les images téléchargées seront stockées
        filename: (req, file, callback) => {
          const originalExt = extname(file.originalname)
          const uniqueFilename = `${uuidv4()}${originalExt}`
          callback(null, uniqueFilename)
        },
      }),
    }),
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarModule {}
