import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { UserDto } from './Dto/users.dto'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'
import { User } from './models/users.models'
import { Car } from 'src/car/models/car.model'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  Add(@Body() body: UserDto) {
    return this.service.Add(body)
  }
  //@UseGuards(AuthGuard('jwt'))
  @Get()
  FindAll(@Query('key') key) {
    {
      return this.service.FindAll(key)
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  FindOne(@Param('id') id: string) {
    return this.service.FindOne(id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  Update(@Param('id') id: string, @Body() body: UserDto) {
    return this.service.updateUser(id, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.service.deleteUser(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('favorites/:carId')
  async addCarToFavorites(
    @Req() req,
    @Param('carId') carId: string,
  ): Promise<User> {
    const userId = req.user.id // Ici, nous obtenons l'ID de l'utilisateur à partir du token JWT
    return this.service.addCarToFavorites(userId, carId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/favorites')
  async getUserFavorites(@Param('userId') userId: string): Promise<Car[]> {
    return this.service.getUserFavorites(userId)
  }

  /* @Post('/search')
  Search(@Query('key') key) {
    return this.service.Search(key);
  }*/

  /*@Post('faker')
  Faker() {
    return this.service.Faker();
  }*/
}
