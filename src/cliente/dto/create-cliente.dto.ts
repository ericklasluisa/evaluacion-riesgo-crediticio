import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsNotEmpty({ message: 'El puntaje de crédito es obligatorio' })
  @IsNumber({}, { message: 'El puntaje de crédito debe ser un número' })
  @Min(0, { message: 'El puntaje de crédito debe ser un número positivo' })
  puntajeCredito: number;

  @IsNotEmpty({ message: 'El monto solicitado es obligatorio' })
  @IsNumber({}, { message: 'El monto solicitado debe ser un número' })
  @Min(0, { message: 'El monto solicitado debe ser un número positivo' })
  montoSolicitado: number;

  @IsNotEmpty({ message: 'El plazo en meses es obligatorio' })
  @IsNumber({}, { message: 'El plazo en meses debe ser un número' })
  @Min(1, { message: 'El plazo en meses debe ser al menos 1' })
  plazoEnMeses: number;
}

export class CreatePersonaJuridicaDto extends CreateClienteDto {
  @IsNotEmpty({ message: 'La antigüedad en años es obligatoria' })
  @IsNumber({}, { message: 'La antigüedad debe ser un número' })
  @Min(0, { message: 'La antigüedad debe ser un número positivo' })
  antiguedadAnios: number;

  @IsNotEmpty({ message: 'El ingreso anual es obligatorio' })
  @IsNumber({}, { message: 'El ingreso anual debe ser un número' })
  @Min(0, { message: 'El ingreso anual debe ser un número positivo' })
  ingresoAnual: number;

  @IsNotEmpty({ message: 'El número de empleados es obligatorio' })
  @IsNumber({}, { message: 'El número de empleados debe ser un número' })
  @Min(0, { message: 'El número de empleados debe ser un número positivo' })
  empleados: number;
}

export class CreatePersonaNaturalDto extends CreateClienteDto {
  @IsNotEmpty({ message: 'La edad es obligatoria' })
  @IsNumber({}, { message: 'La edad debe ser un número' })
  @Min(18, { message: 'La edad debe ser al menos 18 años' })
  edad: number;

  @IsNotEmpty({ message: 'El ingreso mensual es obligatorio' })
  @IsNumber({}, { message: 'El ingreso mensual debe ser un número' })
  @Min(0, { message: 'El ingreso mensual debe ser un número positivo' })
  ingresoMensual: number;
}
