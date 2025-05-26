import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deuda } from 'src/deuda/entities/deuda.entity';
import { Cliente } from './entities/cliente.entity';
import { PersonaJuridica } from './entities/personaJuridica.entity';
import { PersonaNatural } from './entities/personaNatural.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente, PersonaNatural, PersonaJuridica, Deuda]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
