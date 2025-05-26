import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeudaDto } from './dto/create-deuda.dto';
import { UpdateDeudaDto } from './dto/update-deuda.dto';
import { Deuda } from './entities/deuda.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class DeudaService {
  constructor(
    @InjectRepository(Deuda)
    private deudaRepository: Repository<Deuda>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createDeudaDto: CreateDeudaDto) {
    const { idCliente, ...deudaData } = createDeudaDto;

    const cliente = await this.clienteRepository.findOne({
      where: { id: idCliente },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
    }

    const deuda = this.deudaRepository.create({
      ...deudaData,
      cliente,
    });

    return await this.deudaRepository.save(deuda);
  }

  async findAll() {
    return await this.deudaRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number) {
    const deuda = await this.deudaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!deuda) {
      throw new NotFoundException(`Deuda con ID ${id} no encontrada`);
    }

    return deuda;
  }

  async update(id: number, updateDeudaDto: UpdateDeudaDto) {
    const deuda = await this.findOne(id);

    const { idCliente, ...deudaData } = updateDeudaDto;

    if (idCliente) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: idCliente },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con ID ${idCliente} no encontrado`,
        );
      }

      deuda.cliente = cliente;
    }

    Object.assign(deuda, deudaData);

    return await this.deudaRepository.save(deuda);
  }

  async remove(id: number) {
    const deuda = await this.findOne(id);
    return await this.deudaRepository.remove(deuda);
  }
}
