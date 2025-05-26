import { PartialType } from '@nestjs/mapped-types';
import { CreateResultadoEvaluacionDto } from './create-resultado-evaluacion.dto';

export class UpdateResultadoEvaluacionDto extends PartialType(CreateResultadoEvaluacionDto) {}
