import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Client, ClientSchema } from './models/clients.models'
import { ClientDto } from './Dto/clients.dto'

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async getAllClients(): Promise<Client[]> {
    return await this.clientModel.find({}).exec()
  }

  async createClient(body: ClientDto) {
    return this.clientModel.create(body)
  }
  FindOne(id: string) {
    return this.clientModel.findOne({ _id: id })
  }

  async updateClient(id: string, body: ClientDto): Promise<string> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .exec()

    if (!updatedClient) {
      throw new NotFoundException('Client not found')
    }

    return 'Client has been updated successfully'
  }
  async deleteClient(id: string): Promise<string> {
    const deletedUser = await this.clientModel.findByIdAndDelete(id).exec()
    if (!deletedUser) {
      throw new NotFoundException('Client not found')
    }

    return 'Client has been deleted successfully'
  }
}
