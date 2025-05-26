import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResultadoEvaluacionService } from './resultado-evaluacion.service';
import { CreateResultadoEvaluacionDto } from './dto/create-resultado-evaluacion.dto';
import { UpdateResultadoEvaluacionDto } from './dto/update-resultado-evaluacion.dto';

@Controller('resultado-evaluacion')
export class ResultadoEvaluacionController {
  constructor(
    private readonly resultadoEvaluacionService: ResultadoEvaluacionService,
  ) {}

  @Post()
  create(@Body() createResultadoEvaluacionDto: CreateResultadoEvaluacionDto) {
    return this.resultadoEvaluacionService.create(createResultadoEvaluacionDto);
  }

  @Get()
  findAll(@Query('clienteId') clienteId?: string) {
    if (clienteId) {
      return this.resultadoEvaluacionService.findByClienteId(+clienteId);
    }
    return this.resultadoEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultadoEvaluacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResultadoEvaluacionDto: UpdateResultadoEvaluacionDto,
  ) {
    return this.resultadoEvaluacionService.update(
      +id,
      updateResultadoEvaluacionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultadoEvaluacionService.remove(+id);
  }
}
