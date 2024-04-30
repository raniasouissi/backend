import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { PromotionService } from './promotion.service'
import { Promotion } from './models/promotion.model'
import { CreatePromotionDto } from './Dto/promotion.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPromotion(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.createPromotion(createPromotionDto)
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllPromotions(): Promise<Promotion[]> {
    return this.promotionService.getAllPromotions()
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getPromotionById(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.getPromotionById(id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePromotion(
    @Param('id') id: string,
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.updatePromotion(id, createPromotionDto)
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePromotion(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.deletePromotion(id)
  }
}
