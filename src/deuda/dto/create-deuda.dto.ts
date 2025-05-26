import { IsNotEmpty } from 'class-validator';

export class CreateDeudaDto {
  @IsNotEmpty()
  idCliente: number;
  @IsNotEmpty()
  monto: number;
  @IsNotEmpty()
  plazoMeses: number;
}
