import { Module } from '@nestjs/common';
import { ResultadoEvaluacionService } from './resultado-evaluacion.service';
import { ResultadoEvaluacionController } from './resultado-evaluacion.controller';

@Module({
  controllers: [ResultadoEvaluacionController],
  providers: [ResultadoEvaluacionService],
})
export class ResultadoEvaluacionModule {}
