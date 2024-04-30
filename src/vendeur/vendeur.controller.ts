import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { VendeursService } from "./vendeur.service";
import { Vendeur } from "./models/vendeur.models";
import { VendeurDto } from "./Dto/vendeur.dto";

@Controller("vendeurs")
export class VendeursController {
  constructor(private vendeursService: VendeursService) {}

  @Post()
  async create(@Body() body: VendeurDto) {
    return this.vendeursService.createVendeur(body);
  }

  @Get()
  async findAll(): Promise<Vendeur[]> {
    return this.vendeursService.getAllVendeurs();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.vendeursService.findOne(id);
  }

  @Put("/:id")
  update(@Param("id") id: string, @Body() body: VendeurDto) {
    return this.vendeursService.updateVendeur(id, body);
  }

  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.vendeursService.deleteVendeur(id);
  }
}
