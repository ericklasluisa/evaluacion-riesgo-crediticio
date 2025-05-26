import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultadoEvaluacionDto } from './dto/create-resultado-evaluacion.dto';
import { UpdateResultadoEvaluacionDto } from './dto/update-resultado-evaluacion.dto';
import { ResultadoEvaluacion } from './entities/resultado-evaluacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class ResultadoEvaluacionService {
  constructor(
    @InjectRepository(ResultadoEvaluacion)
    private resultadoRepository: Repository<ResultadoEvaluacion>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createResultadoEvaluacionDto: CreateResultadoEvaluacionDto) {
    const { clienteId, ...resultadoData } = createResultadoEvaluacionDto;

    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    const resultado = this.resultadoRepository.create({
      ...resultadoData,
      cliente,
    });

    return await this.resultadoRepository.save(resultado);
  }

  async findAll() {
    return await this.resultadoRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number) {
    const resultado = await this.resultadoRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!resultado) {
      throw new NotFoundException(
        `Resultado de evaluación con ID ${id} no encontrado`,
      );
    }

    return resultado;
  }

  async findByClienteId(clienteId: number) {
    return await this.resultadoRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente'],
    });
  }

  async update(
    id: number,
    updateResultadoEvaluacionDto: UpdateResultadoEvaluacionDto,
  ) {
    const resultado = await this.findOne(id);

    const { clienteId, ...resultadoData } = updateResultadoEvaluacionDto;

    if (clienteId) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: clienteId },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con ID ${clienteId} no encontrado`,
        );
      }

      resultado.cliente = cliente;
    }

    Object.assign(resultado, resultadoData);

    return await this.resultadoRepository.save(resultado);
  }

  async remove(id: number) {
    const resultado = await this.findOne(id);
    return await this.resultadoRepository.remove(resultado);
  }
}
