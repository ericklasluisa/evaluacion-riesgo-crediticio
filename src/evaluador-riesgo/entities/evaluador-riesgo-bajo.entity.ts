import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';

export class EvaluadorRiesgoBajo extends EvaluadorRiesgo {
  aplica(cliente: Cliente): boolean {
    return cliente.esAptoParaCredito() >= 80;
  }
  evaluar(cliente: Cliente): any {
    return this.aplica(cliente)
      ? {
          nivelRiesgo: 'bajo',
          aprobado: true,
          puntajeFinal: cliente.esAptoParaCredito(),
          mensaje: 'El cliente es apto para crédito con bajo riesgo.',
          tasaInteres: 0.05,
          plazoAprobado: cliente.plazoEnMeses,
        }
      : null;
  }
}
