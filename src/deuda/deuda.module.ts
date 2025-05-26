import { Module } from '@nestjs/common';
import { DeudaService } from './deuda.service';
import { DeudaController } from './deuda.controller';

@Module({
  controllers: [DeudaController],
  providers: [DeudaService],
})
export class DeudaModule {}
