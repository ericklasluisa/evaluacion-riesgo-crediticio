import { Module } from '@nestjs/common';
import { PersonaJuridicaService } from './persona-juridica.service';
import { PersonaJuridicaController } from './persona-juridica.controller';

@Module({
  controllers: [PersonaJuridicaController],
  providers: [PersonaJuridicaService],
})
export class PersonaJuridicaModule {}
