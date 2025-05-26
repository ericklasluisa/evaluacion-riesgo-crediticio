import { Module } from '@nestjs/common';
import { PersonaNaturalService } from './persona-natural.service';
import { PersonaNaturalController } from './persona-natural.controller';

@Module({
  controllers: [PersonaNaturalController],
  providers: [PersonaNaturalService],
})
export class PersonaNaturalModule {}
