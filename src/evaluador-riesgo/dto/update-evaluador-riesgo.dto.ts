import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluadorRiesgoDto } from './create-evaluador-riesgo.dto';

export class UpdateEvaluadorRiesgoDto extends PartialType(CreateEvaluadorRiesgoDto) {}
