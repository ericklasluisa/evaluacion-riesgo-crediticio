import { Controller, Get, Param } from '@nestjs/common';
import { EvaluacionService } from '../services/evaluacion.service';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Get('cliente/:id')
  evaluarCliente(@Param('id') id: string) {
    return this.evaluacionService.evaluarCliente(+id);
  }

  @Get('historial')
  obtenerHistorial() {
    return this.evaluacionService.obtenerHistorialEvaluaciones();
  }
}
