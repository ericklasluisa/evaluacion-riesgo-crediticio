import { Injectable } from '@nestjs/common';
import { CreateHistorialEvaluacionDto } from './dto/create-historial-evaluacion.dto';
import { UpdateHistorialEvaluacionDto } from './dto/update-historial-evaluacion.dto';

@Injectable()
export class HistorialEvaluacionService {
  create(createHistorialEvaluacionDto: CreateHistorialEvaluacionDto) {
    return 'This action adds a new historialEvaluacion';
  }

  findAll() {
    return `This action returns all historialEvaluacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialEvaluacion`;
  }

  update(id: number, updateHistorialEvaluacionDto: UpdateHistorialEvaluacionDto) {
    return `This action updates a #${id} historialEvaluacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialEvaluacion`;
  }
}
