// promotion.service.ts

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Promotion, PromotionDocument } from './models/promotion.model'
import { CreatePromotionDto } from './Dto/promotion.dto'

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: Model<PromotionDocument>,
  ) {}

  async createPromotion(promotionData: CreatePromotionDto): Promise<Promotion> {
    const promotion = new this.promotionModel(promotionData)
    return promotion.save()
  }

  async getAllPromotions(): Promise<any> {
    // Supprimer automatiquement les promotions expirées avant de renvoyer la liste
    await this.deleteExpiredPromotions()

    // Récupérer toutes les promotions et également peupler le champ 'car' pour avoir les détails de la voiture
    const promotions = await this.promotionModel.find().populate('car').exec()

    // Vérifier si chaque promotion est expirée et ajouter un message approprié
    const currentDate = new Date()
    return promotions.map((promotion) => ({
      ...promotion.toJSON(),
      message:
        promotion.endDate < currentDate
          ? 'La promotion est expirée.'
          : 'La promotion est active.',
    }))
  }

  async getPromotionById(id: string): Promise<Promotion> {
    return this.promotionModel.findById(id).populate('car').exec()
  }

  async updatePromotion(
    id: string,
    promotionData: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionModel
      .findByIdAndUpdate(id, promotionData, { new: true })
      .exec()
  }

  async deletePromotion(id: string): Promise<Promotion> {
    return this.promotionModel.findByIdAndDelete(id).exec()
  }

  private async deleteExpiredPromotions(): Promise<void> {
    const currentDate = new Date()
    await this.promotionModel
      .deleteMany({ endDate: { $lte: currentDate } })
      .exec()
  }
}
