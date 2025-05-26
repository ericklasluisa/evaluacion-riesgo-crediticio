import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudaService } from './deuda.service';
import { DeudaController } from './deuda.controller';
import { Deuda } from './entities/deuda.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deuda, Cliente])],
  controllers: [DeudaController],
  providers: [DeudaService],
  exports: [DeudaService],
})
export class DeudaModule {}
