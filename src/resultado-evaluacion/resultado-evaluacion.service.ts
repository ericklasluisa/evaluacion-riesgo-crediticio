import { Injectable } from '@nestjs/common';
import { CreateResultadoEvaluacionDto } from './dto/create-resultado-evaluacion.dto';
import { UpdateResultadoEvaluacionDto } from './dto/update-resultado-evaluacion.dto';

@Injectable()
export class ResultadoEvaluacionService {
  create(createResultadoEvaluacionDto: CreateResultadoEvaluacionDto) {
    return 'This action adds a new resultadoEvaluacion';
  }

  findAll() {
    return `This action returns all resultadoEvaluacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultadoEvaluacion`;
  }

  update(id: number, updateResultadoEvaluacionDto: UpdateResultadoEvaluacionDto) {
    return `This action updates a #${id} resultadoEvaluacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultadoEvaluacion`;
  }
}
