import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEvaluadorRiesgoDto } from './dto/create-evaluador-riesgo.dto';
import { UpdateEvaluadorRiesgoDto } from './dto/update-evaluador-riesgo.dto';
import { EvaluadorRiesgoBajo } from './entities/evaluador-riesgo-bajo.entity';
import { EvaluadorRiesgoMedio } from './entities/evaluador-riesgo-medio.entity';
import { EvaluadorRiesgoAlto } from './entities/evaluador-riesgo-alto.entity';
import { ClienteService } from '../cliente/cliente.service';
import {
  CreatePersonaNaturalDto,
  CreatePersonaJuridicaDto,
} from '../cliente/dto/create-cliente.dto';
import { DeudaService } from '../deuda/deuda.service';

@Injectable()
export class EvaluadorRiesgoService {
  private evaluadores = [
    new EvaluadorRiesgoBajo(),
    new EvaluadorRiesgoMedio(),
    new EvaluadorRiesgoAlto(),
  ];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly deudaService: DeudaService,
  ) {}

  async create(entity: CreateEvaluadorRiesgoDto) {
    try {
      // Crear el cliente según su tipo
      const clienteDto = this.mapToClienteDto(entity);
      const cliente = await this.clienteService.create(clienteDto);

      // Crear las deudas si existen
      if (entity.deudasActuales && entity.deudasActuales.length > 0) {
        for (const deudaDto of entity.deudasActuales) {
          await this.deudaService.create({
            ...deudaDto,
            idCliente: cliente.id,
          });
        }
      }

      // Evaluar al cliente recién creado
      const evaluacion = await this.evaluarCliente(cliente.id);

      return {
        cliente,
        evaluacion,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al crear evaluación: ${error.message}`,
      );
    }
  }

  async findAll() {
    const clientes = await this.clienteService.findAll();
    const evaluaciones = [];

    for (const cliente of clientes) {
      const evaluacion = await this.evaluarCliente(cliente.id);
      evaluaciones.push({
        cliente,
        evaluacion,
      });
    }

    return evaluaciones;
  }

  async findOne(id: number) {
    const cliente = await this.clienteService.findOne(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    const evaluacion = await this.evaluarCliente(id);
    return {
      cliente,
      evaluacion,
    };
  }

  async update(id: number, updateEvaluadorRiesgoDto: UpdateEvaluadorRiesgoDto) {
    // Primero actualizamos el cliente
    await this.clienteService.update(
      id,
      this.mapToClienteDto(
        updateEvaluadorRiesgoDto as CreateEvaluadorRiesgoDto,
      ),
    );

    // Luego evaluamos al cliente actualizado
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.clienteService.remove(id);
  }

  async evaluarCliente(clienteId: number) {
    const cliente = await this.clienteService.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    // Aplicar cadena de evaluadores
    for (const evaluador of this.evaluadores) {
      const resultado = evaluador.evaluar(cliente);
      if (resultado) {
        return {
          ...resultado,
          ingresoReferencial: cliente.getIngresoReferencial(),
          montoDeudas: cliente.getMontoDeudas(),
          cargaDeuda:
            cliente.getMontoDeudas() / cliente.getIngresoReferencial(),
        };
      }
    }

    return {
      nivelRiesgo: 'no determinado',
      aprobado: false,
      mensaje: 'No se pudo determinar el nivel de riesgo del cliente',
      montoDeudas: cliente.getMontoDeudas(),
      ingresoReferencial: cliente.getIngresoReferencial(),
    };
  }

  private mapToClienteDto(
    entity: CreateEvaluadorRiesgoDto,
  ): CreatePersonaNaturalDto | CreatePersonaJuridicaDto {
    const baseDto = {
      nombre: entity.nombre,
      puntajeCredito: entity.puntajeCrediticio,
      montoSolicitado: entity.montoSolicitado,
      plazoEnMeses: entity.plazoEnMeses,
    };

    if (entity.tipoCliente === 'NATURAL') {
      return {
        ...baseDto,
        edad: entity.edad,
        ingresoMensual: entity.ingresoMensual,
      } as CreatePersonaNaturalDto;
    } else {
      return {
        ...baseDto,
        antiguedadAnios: entity.antiguedadAnios,
        ingresoAnual: entity.ingresoAnual,
        empleados: entity.empleados,
      } as CreatePersonaJuridicaDto;
    }
  }
}
