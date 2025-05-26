import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistorialEvaluacionDto {
  @IsString()
  clienteNombre: string;

  @IsString()
  tipoCliente: string;

  @IsNumber()
  montoSolicitado: number;

  @IsNumber()
  plazoEnMeses: number;

  @IsString()
  nivelRiesgo: string;

  @IsBoolean()
  aprobado: boolean;

  @IsOptional()
  @IsDate()
  fechaConsulta?: Date;

  @IsNumber()
  clienteId: number;
}
