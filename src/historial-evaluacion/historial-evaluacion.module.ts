import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialEvaluacionService } from './historial-evaluacion.service';
import { HistorialEvaluacionController } from './historial-evaluacion.controller';
import { HistorialEvaluacion } from './entities/historial-evaluacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialEvaluacion, Cliente])],
  controllers: [HistorialEvaluacionController],
  providers: [HistorialEvaluacionService],
})
export class HistorialEvaluacionModule {}
