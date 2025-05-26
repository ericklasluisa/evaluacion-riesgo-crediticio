import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { PersonaNatural } from 'src/cliente/entities/personaNatural.entity';
import { PersonaJuridica } from 'src/cliente/entities/personaJuridica.entity';
import { EvaluadorRiesgo } from '../entities/evaluador-riesgo.entity';
import { EvaluadorPersonaNatural } from '../entities/evaluador-persona-natural.entity';
import { EvaluadorPersonaJuridica } from '../entities/evaluador-persona-juridica.entity';

@Injectable()
export class EvaluadorRiesgoFactory {
  crearEvaluador(cliente: Cliente): EvaluadorRiesgo {
    if (cliente instanceof PersonaNatural) {
      return new EvaluadorPersonaNatural();
    } else if (cliente instanceof PersonaJuridica) {
      return new EvaluadorPersonaJuridica();
    } else {
      throw new Error('Tipo de cliente no soportado');
    }
  }
}
