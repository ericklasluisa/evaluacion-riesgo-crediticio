import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonaJuridicaService } from './persona-juridica.service';
import { CreatePersonaJuridicaDto } from './dto/create-persona-juridica.dto';
import { UpdatePersonaJuridicaDto } from './dto/update-persona-juridica.dto';

@Controller('persona-juridica')
export class PersonaJuridicaController {
  constructor(private readonly personaJuridicaService: PersonaJuridicaService) {}

  @Post()
  create(@Body() createPersonaJuridicaDto: CreatePersonaJuridicaDto) {
    return this.personaJuridicaService.create(createPersonaJuridicaDto);
  }

  @Get()
  findAll() {
    return this.personaJuridicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaJuridicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaJuridicaDto: UpdatePersonaJuridicaDto) {
    return this.personaJuridicaService.update(+id, updatePersonaJuridicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaJuridicaService.remove(+id);
  }
}
