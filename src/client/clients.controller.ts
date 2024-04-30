import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ClientsService } from './client.service'
import { Client } from './models/clients.models'
import { ClientDto } from './Dto/clients.dto'

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  async create(@Body() body: ClientDto) {
    return this.clientsService.createClient(body)
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.getAllClients()
  }
  @Get('/:id')
  FindOne(@Param('id') id: string) {
    return this.clientsService.FindOne(id)
  }

  @Put('/:id')
  Update(@Param('id') id: string, @Body() body: ClientDto) {
    return this.clientsService.updateClient(id, body)
  }

  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.clientsService.deleteClient(id)
  }
}
