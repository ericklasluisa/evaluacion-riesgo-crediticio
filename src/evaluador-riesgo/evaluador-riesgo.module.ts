import { Module } from '@nestjs/common';
import { EvaluadorRiesgoService } from './evaluador-riesgo.service';
import { EvaluadorRiesgoController } from './evaluador-riesgo.controller';

@Module({
  controllers: [EvaluadorRiesgoController],
  providers: [EvaluadorRiesgoService],
})
export class EvaluadorRiesgoModule {}
