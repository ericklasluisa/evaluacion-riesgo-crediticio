import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';

export class EvaluadorRiesgoAlto extends EvaluadorRiesgo {
  aplica(cliente: Cliente): boolean {
    const puntaje = cliente.esAptoParaCredito();
    return puntaje < 60;
  }

  evaluar(cliente: Cliente): any {
    return this.aplica(cliente)
      ? {
          nivelRiesgo: 'alto',
          aprobado: false,
          puntajeFinal: cliente.esAptoParaCredito(),
          mensaje:
            'El cliente no es apto para crédito debido a su alto nivel de riesgo.',
          tasaInteres: 0,
          // Para riesgo alto, se aprueba un plazo significativamente reducido o ninguno
          plazoAprobado: 0,
          // Adicional: se establece un límite de monto para clientes de alto riesgo
          montoAprobado: 0,
        }
      : null;
  }
}
