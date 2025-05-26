import { Module } from '@nestjs/common';
import { EvaluadorRiesgoService } from './evaluador-riesgo.service';
import { EvaluadorRiesgoController } from './evaluador-riesgo.controller';
import { ClienteModule } from '../cliente/cliente.module';
import { DeudaModule } from '../deuda/deuda.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluadorRiesgo } from './entities/evaluador-riesgo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Deuda } from 'src/deuda/entities/deuda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluadorRiesgo, Cliente, Deuda]),
    ClienteModule,
    DeudaModule,
  ],
  controllers: [EvaluadorRiesgoController],
  providers: [EvaluadorRiesgoService],
  exports: [EvaluadorRiesgoService],
})
export class EvaluadorRiesgoModule {}
