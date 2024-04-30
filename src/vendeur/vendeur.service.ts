import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vendeur, VendeurDocument } from './models/vendeur.models'
import { User, UserDocument } from 'src/users/models/users.models'
import { VendeurDto } from './Dto/vendeur.dto'

@Injectable()
export class VendeursService {
  constructor(
    @InjectModel(Vendeur.name) private vendeurModel: Model<VendeurDocument>,
  ) {}

  async getAllVendeurs(): Promise<Vendeur[]> {
    return await this.vendeurModel.find({}).exec()
  }

  async createVendeur(body: VendeurDto) {
    return this.vendeurModel.create(body)
  }

  findOne(id: string) {
    return this.vendeurModel.findOne({ _id: id })
  }

  async updateVendeur(id: string, body: VendeurDto): Promise<string> {
    const updatedVendeur = await this.vendeurModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .exec()

    if (!updatedVendeur) {
      throw new NotFoundException('Vendeur not found')
    }

    return 'Vendeur has been updated successfully'
  }

  async deleteVendeur(id: string): Promise<string> {
    const deletedVendeur = await this.vendeurModel.findByIdAndDelete(id).exec()

    if (!deletedVendeur) {
      throw new NotFoundException('Vendeur not found')
    }

    return 'Vendeur has been deleted successfully'
  }
}
