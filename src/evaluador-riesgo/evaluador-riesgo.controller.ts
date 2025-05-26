import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluadorRiesgoService } from './evaluador-riesgo.service';
import { CreateEvaluadorRiesgoDto } from './dto/create-evaluador-riesgo.dto';
import { UpdateEvaluadorRiesgoDto } from './dto/update-evaluador-riesgo.dto';

@Controller('evaluador-riesgo')
export class EvaluadorRiesgoController {
  constructor(private readonly evaluadorRiesgoService: EvaluadorRiesgoService) {}

  @Post()
  create(@Body() createEvaluadorRiesgoDto: CreateEvaluadorRiesgoDto) {
    return this.evaluadorRiesgoService.create(createEvaluadorRiesgoDto);
  }

  @Get()
  findAll() {
    return this.evaluadorRiesgoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluadorRiesgoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluadorRiesgoDto: UpdateEvaluadorRiesgoDto) {
    return this.evaluadorRiesgoService.update(+id, updateEvaluadorRiesgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluadorRiesgoService.remove(+id);
  }
}
