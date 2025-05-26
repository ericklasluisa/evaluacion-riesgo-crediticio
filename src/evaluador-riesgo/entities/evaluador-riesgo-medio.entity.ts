import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';

export class EvaluadorRiesgoMedio extends EvaluadorRiesgo {
  aplica(cliente: Cliente): boolean {
    // Aplica para clientes con puntaje entre 60 y 79
    const puntaje = cliente.esAptoParaCredito();
    return puntaje >= 60 && puntaje < 80;
  }

  evaluar(cliente: Cliente): any {
    return this.aplica(cliente)
      ? {
          nivelRiesgo: 'medio',
          aprobado: true,
          puntajeFinal: cliente.esAptoParaCredito(),
          mensaje: 'El cliente es apto para crédito con riesgo medio.',
          tasaInteres: 0.12,
          // Para riesgo medio, se aprueba un plazo más corto del solicitado
          plazoAprobado: Math.min(
            cliente.plazoEnMeses,
            Math.floor(cliente.plazoEnMeses * 0.8),
          ),
        }
      : null;
  }
}
