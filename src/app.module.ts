import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { DeudaModule } from './deuda/deuda.module';
import { EvaluadorRiesgoModule } from './evaluador-riesgo/evaluador-riesgo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'EvaluacionRiesgoDB',
      entities: [],
      synchronize: true,
    }),
    ClienteModule,
    DeudaModule,
    EvaluadorRiesgoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
