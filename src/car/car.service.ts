import { Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Car, CarDocument } from './models/car.model'
import {
  Promotion,
  PromotionDocument,
} from 'src/promotion/models/promotion.model'
import { CreatePromotionDto } from 'src/promotion/Dto/promotion.dto'

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(Promotion.name)
    private promotionModel: Model<PromotionDocument>,
  ) {}

  async createCar(
    name: string,
    brand: string,
    year: number,
    image: string,
    puissancefiscale: string,
    prix: number,
    Kilometrage: string,
    description: string,
    Carburant: string,
  ): Promise<Car> {
    const newCar = new this.carModel({
      name,
      brand,
      year,
      image,
      puissancefiscale,
      prix,
      Kilometrage,
      description,
      Carburant,
    })
    return newCar.save()
  }

  async findAllCars(): Promise<Car[]> {
    return this.carModel.find().exec()
  }

  async findCarById(id: string): Promise<Car> {
    return this.carModel.findById(id).exec()
  }

  async updateCar(
    id: string,
    name: string,
    brand: string,
    year: number,
    image: string,
    puissancefiscale: string,
    prix: number,
    Kilometrage: string,
    description: string,
    Carburant: string,
  ): Promise<Car> {
    return this.carModel
      .findByIdAndUpdate(
        id,
        {
          name,
          brand,
          year,
          image,
          puissancefiscale,
          prix,
          Kilometrage,
          description,
          Carburant,
        },
        { new: true },
      )
      .exec()
  }

  async deleteCar(id: string): Promise<Car> {
    return this.carModel.findByIdAndRemove(id).exec()
  }
  async getCarsByBrand(brand: string): Promise<Car[]> {
    return this.carModel.find({ brand }).exec()
  }

  async getPromotionsForCar(carId: string): Promise<Promotion[]> {
    // Recherche de la voiture par son ID
    const car = await this.carModel.findById(carId).exec()

    // Si la voiture n'est pas trouvée, renvoyer un tableau vide car il n'y a pas de promotions associées
    if (!car) {
      return []
    }

    // Recherche de toutes les promotions associées à la voiture
    const promotions = await this.promotionModel.find({ car: carId }).exec()
    return promotions
  }
}
