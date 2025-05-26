import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ResultadoEvaluacion } from '../entities/resultado-evaluacion.entity';
import { EvaluadorRiesgoAltoService } from './evaluador-riesgo-alto.service';
import { EvaluadorRiesgoMedioService } from './evaluador-riesgo-medio.service';
import { EvaluadorRiesgoBajoService } from './evaluador-riesgo-bajo.service';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(ResultadoEvaluacion)
    private resultadoRepository: Repository<ResultadoEvaluacion>,
    private evaluadorRiesgoAlto: EvaluadorRiesgoAltoService,
    private evaluadorRiesgoMedio: EvaluadorRiesgoMedioService,
    private evaluadorRiesgoBajo: EvaluadorRiesgoBajoService,
  ) {}

  async evaluarCliente(id: number): Promise<ResultadoEvaluacion> {
    // Buscar cliente
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['deudasActuales'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    // Seleccionar el evaluador del perfil del cliente
    let resultado: ResultadoEvaluacion;

    if (this.evaluadorRiesgoAlto.aplica(cliente)) {
      resultado = this.evaluadorRiesgoAlto.evaluar(cliente);
    } else if (this.evaluadorRiesgoMedio.aplica(cliente)) {
      resultado = this.evaluadorRiesgoMedio.evaluar(cliente);
    } else {
      resultado = this.evaluadorRiesgoBajo.evaluar(cliente);
    }

    // Asociar el cliente al resultado
    resultado.cliente = cliente;
    resultado.fechaEvaluacion = new Date();

    // Guardar el resultado de la evaluación
    return await this.resultadoRepository.save(resultado);
  }

  async obtenerHistorialEvaluaciones(): Promise<ResultadoEvaluacion[]> {
    return await this.resultadoRepository.find({
      relations: ['cliente'],
      order: { fechaEvaluacion: 'DESC' },
    });
  }
}
