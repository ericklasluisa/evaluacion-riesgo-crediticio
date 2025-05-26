import { Injectable } from '@nestjs/common';
import { CreatePersonaJuridicaDto } from './dto/create-persona-juridica.dto';
import { UpdatePersonaJuridicaDto } from './dto/update-persona-juridica.dto';

@Injectable()
export class PersonaJuridicaService {
  create(createPersonaJuridicaDto: CreatePersonaJuridicaDto) {
    return 'This action adds a new personaJuridica';
  }

  findAll() {
    return `This action returns all personaJuridica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personaJuridica`;
  }

  update(id: number, updatePersonaJuridicaDto: UpdatePersonaJuridicaDto) {
    return `This action updates a #${id} personaJuridica`;
  }

  remove(id: number) {
    return `This action removes a #${id} personaJuridica`;
  }
}
