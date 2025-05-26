import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionController } from './controllers/evaluacion.controller';
import { EvaluacionService } from './services/evaluacion.service';
import { ResultadoEvaluacion } from './entities/resultado-evaluacion.entity';
import { EvaluadorRiesgoAltoService } from './services/evaluador-riesgo-alto.service';
import { EvaluadorRiesgoMedioService } from './services/evaluador-riesgo-medio.service';
import { EvaluadorRiesgoBajoService } from './services/evaluador-riesgo-bajo.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEvaluacion, Cliente])],
  controllers: [EvaluacionController],
  providers: [
    EvaluacionService,
    EvaluadorRiesgoAltoService,
    EvaluadorRiesgoMedioService,
    EvaluadorRiesgoBajoService,
  ],
})
export class EvaluacionModule {}
