import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Query,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CarsService } from './car.service'
import { Car } from './models/car.model'
import { StringArraySupportOption } from 'prettier'
import { AuthGuard } from '@nestjs/passport'
import { CreatePromotionDto } from 'src/promotion/Dto/promotion.dto'
import { Promotion } from 'src/promotion/models/promotion.model'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCar(
    @Body('name') name: string,
    @Body('brand') brand: string,
    @Body('year') year: number,
    @UploadedFile() image: Express.Multer.File,
    @Body('puissancefiscale') puissancefiscale: string,
    @Body('prix') prix: number,
    @Body('Kilometrage') Kilometrage: string,
    @Body('description') description: string,
    @Body('Carburant') Carburant: string,
  ) {
    const imageUrl = image ? image.filename : '' // Utilisez filename au lieu de path

    return this.carsService.createCar(
      name,
      brand,
      year,
      imageUrl,
      puissancefiscale,
      prix,
      Kilometrage,
      description,
      Carburant,
    )
  }

  @Get()
  async findAllCars() {
    return this.carsService.findAllCars()
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findCarById(@Param('id') id: string) {
    const car = await this.carsService.findCarById(id)
    if (!car) {
      throw new NotFoundException('Car not found')
    }
    car.image = `${process.env.BASE_URL}/uploads/${car.image}`
    return car
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCar(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('brand') brand: string,
    @Body('year') year: number,
    @UploadedFile() image: Express.Multer.File,
    @Body('puissancefiscale') puissancefiscale: string,
    @Body('prix') prix: number,
    @Body('Kilometrage') Kilometrage: string,
    @Body('description') description: string,
    @Body('Carburant') Carburant: string,
  ) {
    const imageUrl = image ? image.path : ''
    return this.carsService.updateCar(
      id,
      name,
      brand,
      year,
      imageUrl,
      puissancefiscale,
      prix,
      Kilometrage,
      description,
      Carburant,
    )
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/byBrand/:brand')
  getCarsByBrand(@Param('brand') brand: string): Promise<Car[]> {
    return this.carsService.getCarsByBrand(brand)
  }
  @Get(':id/promotions')
  async getPromotionsForCar(@Param('id') id: string): Promise<Promotion[]> {
    return this.carsService.getPromotionsForCar(id)
  }
}
