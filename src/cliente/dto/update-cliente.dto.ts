import { PartialType } from '@nestjs/mapped-types';
import {
  CreateClienteDto,
  CreatePersonaJuridicaDto,
  CreatePersonaNaturalDto,
} from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}

export class UpdatePersonaJuridicaDto extends PartialType(
  CreatePersonaJuridicaDto,
) {}

export class UpdatePersonaNaturalDto extends PartialType(
  CreatePersonaNaturalDto,
) {}
