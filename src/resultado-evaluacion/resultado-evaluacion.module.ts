import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoEvaluacionService } from './resultado-evaluacion.service';
import { ResultadoEvaluacionController } from './resultado-evaluacion.controller';
import { ResultadoEvaluacion } from './entities/resultado-evaluacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEvaluacion, Cliente])],
  controllers: [ResultadoEvaluacionController],
  providers: [ResultadoEvaluacionService],
  exports: [ResultadoEvaluacionService],
})
export class ResultadoEvaluacionModule {}
