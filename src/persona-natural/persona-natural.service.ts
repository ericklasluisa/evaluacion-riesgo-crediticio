import { Injectable } from '@nestjs/common';
import { CreatePersonaNaturalDto } from './dto/create-persona-natural.dto';
import { UpdatePersonaNaturalDto } from './dto/update-persona-natural.dto';

@Injectable()
export class PersonaNaturalService {
  create(createPersonaNaturalDto: CreatePersonaNaturalDto) {
    return 'This action adds a new personaNatural';
  }

  findAll() {
    return `This action returns all personaNatural`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personaNatural`;
  }

  update(id: number, updatePersonaNaturalDto: UpdatePersonaNaturalDto) {
    return `This action updates a #${id} personaNatural`;
  }

  remove(id: number) {
    return `This action removes a #${id} personaNatural`;
  }
}
