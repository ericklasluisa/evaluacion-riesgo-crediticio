import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateClienteDto,
  CreatePersonaJuridicaDto,
  CreatePersonaNaturalDto,
} from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { PersonaJuridica } from './entities/personaJuridica.entity';
import { PersonaNatural } from './entities/personaNatural.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(PersonaNatural)
    private personaNaturalRepository: Repository<PersonaNatural>,
    @InjectRepository(PersonaJuridica)
    private personaJuridicaRepository: Repository<PersonaJuridica>,
  ) {}

  async create(entity: CreateClienteDto) {
    if (entity instanceof CreatePersonaNaturalDto) {
      const cliente = this.personaNaturalRepository.create(entity);
      return await this.personaNaturalRepository.save(cliente);
    } else if (entity instanceof CreatePersonaJuridicaDto) {
      const cliente = this.personaJuridicaRepository.create(entity);
      return await this.personaJuridicaRepository.save(cliente);
    } else {
      throw new BadRequestException('Tipo de cliente no válido');
    }
  }
}
