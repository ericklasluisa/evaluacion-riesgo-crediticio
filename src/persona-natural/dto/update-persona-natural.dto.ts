import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaNaturalDto } from './create-persona-natural.dto';

export class UpdatePersonaNaturalDto extends PartialType(CreatePersonaNaturalDto) {}
