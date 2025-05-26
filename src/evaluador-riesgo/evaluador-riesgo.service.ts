import { Injectable } from '@nestjs/common';
import { CreateEvaluadorRiesgoDto } from './dto/create-evaluador-riesgo.dto';
import { UpdateEvaluadorRiesgoDto } from './dto/update-evaluador-riesgo.dto';

@Injectable()
export class EvaluadorRiesgoService {
  create(createEvaluadorRiesgoDto: CreateEvaluadorRiesgoDto) {
    return 'This action adds a new evaluadorRiesgo';
  }

  findAll() {
    return `This action returns all evaluadorRiesgo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluadorRiesgo`;
  }

  update(id: number, updateEvaluadorRiesgoDto: UpdateEvaluadorRiesgoDto) {
    return `This action updates a #${id} evaluadorRiesgo`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluadorRiesgo`;
  }
}
