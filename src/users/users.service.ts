import { Body, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDto } from './dto/users.dto'
import { User, UserDocument } from './models/users.models'

import { ObjectId } from 'mongoose'
import { Car } from 'src/car/models/car.model'

//import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  createUser(user: User) {
    throw new Error('Method not implemented.')
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
  ) {}
  Add(body: UserDto) {
    return this.userModel.create(body)
  }

  FindAll(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {}
    return this.userModel.find(keyword)
  }

  FindOne(id: string) {
    return this.userModel.findOne({ _id: id })
  }

  async updateUser(id: string, body: UserDto): Promise<string> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .exec()

    if (!updatedUser) {
      throw new NotFoundException('User not found')
    }

    return 'User has been updated successfully'
  }

  async deleteUser(id: string): Promise<string> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()

    if (!deletedUser) {
      throw new NotFoundException('User not found')
    }

    return 'User has been deleted successfully'
  }
  async addCarToFavorites(userId: string, carId: string): Promise<User> {
    const user = await this.FindOne(userId)
    if (!user.favoris.includes(carId)) {
      user.favoris.push(carId)
      return user.save()
    }
    return user
  }

  async getUserFavorites(userId: string): Promise<Car[]> {
    const user = await this.FindOne(userId)
    const favoriteCarIds = user.favoris // Tableau d'IDs des voitures en favoris

    // Récupérer les voitures en favoris à partir des IDs
    const favoriteCars = await this.carModel.find({
      _id: { $in: favoriteCarIds },
    })

    return favoriteCars
  } // permet aux user de voir les voiture en favoris

  /*Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.userModel.find(keyword);
  }*/

  /*Faker() {
    for (let index = 0; index < 30; index++) {
      const fakeUser = {
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        age: 30,
        country: faker.address.city(),
      };
      this.userModel.create(fakeUser);
    }
    return 'success';
  }*/
}
