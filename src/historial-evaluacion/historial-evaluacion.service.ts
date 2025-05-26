import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistorialEvaluacionDto } from './dto/create-historial-evaluacion.dto';
import { UpdateHistorialEvaluacionDto } from './dto/update-historial-evaluacion.dto';
import { HistorialEvaluacion } from './entities/historial-evaluacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class HistorialEvaluacionService {
  constructor(
    @InjectRepository(HistorialEvaluacion)
    private historialRepository: Repository<HistorialEvaluacion>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createHistorialEvaluacionDto: CreateHistorialEvaluacionDto) {
    const { clienteId, ...historialData } = createHistorialEvaluacionDto;

    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    const historial = this.historialRepository.create({
      ...historialData,
      fechaConsulta: new Date(),
      cliente,
    });

    return await this.historialRepository.save(historial);
  }

  async findAll() {
    return await this.historialRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number) {
    const historial = await this.historialRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!historial) {
      throw new NotFoundException(
        `Historial de evaluación con ID ${id} no encontrado`,
      );
    }

    return historial;
  }

  async update(
    id: number,
    updateHistorialEvaluacionDto: UpdateHistorialEvaluacionDto,
  ) {
    const historial = await this.findOne(id);

    const { clienteId, ...historialData } = updateHistorialEvaluacionDto;

    if (clienteId) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: clienteId },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con ID ${clienteId} no encontrado`,
        );
      }

      historial.cliente = cliente;
    }

    Object.assign(historial, historialData);

    return await this.historialRepository.save(historial);
  }

  async remove(id: number) {
    const historial = await this.findOne(id);
    return await this.historialRepository.remove(historial);
  }
}
