import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';

export class EvaluadorRiesgoBajo extends EvaluadorRiesgo {
  aplica(cliente: Cliente): boolean {
    const puntaje = this.calcularPuntajeFinal(cliente);
    return puntaje >= 80;
  }
}
