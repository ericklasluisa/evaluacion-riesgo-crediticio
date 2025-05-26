import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { DeudaModule } from './deuda/deuda.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty123',
      database: 'EvaluacionRiesgoDb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClienteModule,
    DeudaModule,
    EvaluacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
