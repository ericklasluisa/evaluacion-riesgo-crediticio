import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistorialEvaluacionService } from './historial-evaluacion.service';
import { CreateHistorialEvaluacionDto } from './dto/create-historial-evaluacion.dto';
import { UpdateHistorialEvaluacionDto } from './dto/update-historial-evaluacion.dto';

@Controller('historial-evaluacion')
export class HistorialEvaluacionController {
  constructor(
    private readonly historialEvaluacionService: HistorialEvaluacionService,
  ) {}

  @Post()
  create(@Body() createHistorialEvaluacionDto: CreateHistorialEvaluacionDto) {
    return this.historialEvaluacionService.create(createHistorialEvaluacionDto);
  }

  @Get()
  findAll() {
    return this.historialEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialEvaluacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistorialEvaluacionDto: UpdateHistorialEvaluacionDto,
  ) {
    return this.historialEvaluacionService.update(
      +id,
      updateHistorialEvaluacionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialEvaluacionService.remove(+id);
  }
}
