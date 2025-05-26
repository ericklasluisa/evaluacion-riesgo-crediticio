import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateClienteDto,
  CreatePersonaJuridicaDto,
  CreatePersonaNaturalDto,
} from './dto/create-cliente.dto';
import {
  UpdateClienteDto,
  UpdatePersonaJuridicaDto,
  UpdatePersonaNaturalDto,
} from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { PersonaNatural } from 'src/persona-natural/entities/persona-natural.entity';
import { PersonaJuridica } from './entities/personaJuridica.entity';

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

  async findAll() {
    return await this.clienteRepository.find({});
  }

  async findAllPersonasNaturales() {
    return await this.personaNaturalRepository.find({});
  }

  async findAllPersonasJuridicas() {
    return await this.personaJuridicaRepository.find({});
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: number, entity: UpdateClienteDto) {
    const cliente = await this.findOne(id);

    if (
      cliente instanceof PersonaNatural &&
      entity instanceof UpdatePersonaNaturalDto
    ) {
      await this.personaNaturalRepository.update(id, entity);
    } else if (
      cliente instanceof PersonaJuridica &&
      entity instanceof UpdatePersonaJuridicaDto
    ) {
      await this.personaJuridicaRepository.update(id, entity);
    } else {
      throw new BadRequestException(
        'Tipo de cliente no coincide con el DTO proporcionado',
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return await this.clienteRepository.remove(cliente);
  }

  async evaluarRiesgoCredito(id: number) {
    const cliente = await this.findOne(id);
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      resultado: cliente.esAptoParaCredito(),
      montoDeudas: cliente.getMontoDeudas(),
      ingresoReferencial: cliente.getIngresoReferencial(),
    };
  }
}
