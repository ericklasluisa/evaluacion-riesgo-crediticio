import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePersonaJuridicaDto,
  CreatePersonaNaturalDto,
} from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { PersonaJuridica } from './entities/personaJuridica.entity';
import { PersonaNatural } from './entities/personaNatural.entity';
import {
  UpdatePersonaJuridicaDto,
  UpdatePersonaNaturalDto,
} from './dto/update-cliente.dto';

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

  async create(entity: CreatePersonaNaturalDto | CreatePersonaJuridicaDto) {
    // Validar que los campos requeridos estén presentes
    if (!entity.puntajeCredito) {
      throw new BadRequestException('El puntaje de crédito es obligatorio');
    }

    if (!entity.montoSolicitado) {
      throw new BadRequestException('El monto solicitado es obligatorio');
    }

    if (!entity.plazoEnMeses) {
      throw new BadRequestException('El plazo en meses es obligatorio');
    }

    if ('edad' in entity) {
      const cliente = this.personaNaturalRepository.create(
        entity as CreatePersonaNaturalDto,
      );
      return await this.personaNaturalRepository.save(cliente);
    } else if ('empleados' in entity) {
      const cliente = this.personaJuridicaRepository.create(
        entity as CreatePersonaJuridicaDto,
      );
      return await this.personaJuridicaRepository.save(cliente);
    } else {
      throw new BadRequestException('Tipo de cliente no válido');
    }
  }

  async findAll() {
    return await this.clienteRepository.find({
      relations: ['deudasActuales'],
    });
  }

  async findAllPersonasNaturales() {
    return await this.personaNaturalRepository.find({
      relations: ['deudasActuales'],
    });
  }

  async findAllPersonasJuridicas() {
    return await this.personaJuridicaRepository.find({
      relations: ['deudasActuales'],
    });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['deudasActuales'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateDto: any) {
    const cliente = await this.findOne(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    if (
      cliente instanceof PersonaNatural &&
      updateDto instanceof UpdatePersonaNaturalDto
    ) {
      await this.personaNaturalRepository.update(id, updateDto);
    } else if (
      cliente instanceof PersonaJuridica &&
      updateDto instanceof UpdatePersonaJuridicaDto
    ) {
      await this.personaJuridicaRepository.update(id, updateDto);
    } else {
      throw new BadRequestException(
        'Tipo de cliente no coincide con el DTO proporcionado',
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return await this.clienteRepository.remove(cliente);
  }
}
