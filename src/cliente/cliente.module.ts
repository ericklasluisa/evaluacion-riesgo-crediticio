import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { PersonaNatural } from './entities/personaNatural.entity';
import { PersonaJuridica } from './entities/personaJuridica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente, PersonaNatural, PersonaJuridica]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
