import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import {
  CreatePersonaJuridicaDto,
  CreatePersonaNaturalDto,
} from './dto/create-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(
    @Body()
    createClienteDto: CreatePersonaNaturalDto | CreatePersonaJuridicaDto,
  ) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get('naturales')
  findAllPersonasNaturales() {
    return this.clienteService.findAllPersonasNaturales();
  }

  @Get('juridicas')
  findAllPersonasJuridicas() {
    return this.clienteService.findAllPersonasJuridicas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: any) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
