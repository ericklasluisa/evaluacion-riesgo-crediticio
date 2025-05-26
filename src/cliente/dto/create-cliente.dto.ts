export class CreateClienteDto {
  nombre: string;
  puntajeCredito: number;
  montoSolicitado: number;
  plazoEnMeses: number;
}

export class CreatePersonaJuridicaDto extends CreateClienteDto {
  antiguedadAnios: number;
  ingresoAnual: number;
  empleados: number;
}

export class CreatePersonaNaturalDto extends CreateClienteDto {
  edad: number;
  ingresoMensual: number;
}
