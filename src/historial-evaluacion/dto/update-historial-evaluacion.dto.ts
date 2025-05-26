import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialEvaluacionDto } from './create-historial-evaluacion.dto';

export class UpdateHistorialEvaluacionDto extends PartialType(CreateHistorialEvaluacionDto) {}
