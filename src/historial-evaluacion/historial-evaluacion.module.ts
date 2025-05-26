import { Module } from '@nestjs/common';
import { HistorialEvaluacionService } from './historial-evaluacion.service';
import { HistorialEvaluacionController } from './historial-evaluacion.controller';

@Module({
  controllers: [HistorialEvaluacionController],
  providers: [HistorialEvaluacionService],
})
export class HistorialEvaluacionModule {}
