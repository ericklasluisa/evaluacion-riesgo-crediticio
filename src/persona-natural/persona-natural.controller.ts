import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonaNaturalService } from './persona-natural.service';
import { CreatePersonaNaturalDto } from './dto/create-persona-natural.dto';
import { UpdatePersonaNaturalDto } from './dto/update-persona-natural.dto';

@Controller('persona-natural')
export class PersonaNaturalController {
  constructor(private readonly personaNaturalService: PersonaNaturalService) {}

  @Post()
  create(@Body() createPersonaNaturalDto: CreatePersonaNaturalDto) {
    return this.personaNaturalService.create(createPersonaNaturalDto);
  }

  @Get()
  findAll() {
    return this.personaNaturalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaNaturalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaNaturalDto: UpdatePersonaNaturalDto) {
    return this.personaNaturalService.update(+id, updatePersonaNaturalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaNaturalService.remove(+id);
  }
}
