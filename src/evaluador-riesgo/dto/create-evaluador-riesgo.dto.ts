import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateDeudaDto } from 'src/deuda/dto/create-deuda.dto';

export class CreateEvaluadorRiesgoDto {
  @IsString()
  tipoCliente: 'NATURAL' | 'JURIDICA';
  @IsString()
  nombre: string;
  @IsNumber()
  puntajeCrediticio: number;
  @IsObject()
  deudasActuales: CreateDeudaDto[];
  @IsNumber()
  montoSolicitado: number;
  @IsNumber()
  plazoEnMeses: number;
  @IsOptional()
  @IsNumber()
  edad?: number; // Solo para Persona Natural
  @IsOptional()
  @IsNumber()
  antiguedadAnios?: number; // Solo para Persona Juridica
  @IsOptional()
  @IsNumber()
  ingresoAnual?: number; // Solo para Persona Juridica
  @IsOptional()
  @IsNumber()
  empleados?: number; // Solo para Persona Juridica
  @IsOptional()
  @IsNumber()
  ingresoMensual?: number; // Solo para Persona Natural
}
