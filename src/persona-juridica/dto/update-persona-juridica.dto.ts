import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaJuridicaDto } from './create-persona-juridica.dto';

export class UpdatePersonaJuridicaDto extends PartialType(CreatePersonaJuridicaDto) {}
