import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ResultadoEvaluacion } from '../entities/resultado-evaluacion.entity';

export interface EvaluadorRiesgo {
  puntajeBase: number;

  aplica(cliente: Cliente): boolean;
  evaluar(cliente: Cliente): ResultadoEvaluacion;
  calcularPuntajeFinal(cliente: Cliente): number;
  determinarNivelRiesgo(puntaje: number): string;
}
