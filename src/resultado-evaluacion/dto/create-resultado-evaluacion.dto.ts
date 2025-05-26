import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResultadoEvaluacionDto {
  @IsString()
  nivelRiesgo: string;

  @IsNumber()
  puntajeObtenido: number;

  @IsBoolean()
  resultadoAprobado: boolean;

  @IsNumber()
  montoAprobado: number;

  @IsNumber()
  plazoAprobado: number;

  @IsOptional()
  @IsNumber()
  tasaInteres?: number;

  @IsNumber()
  clienteId: number;
}
