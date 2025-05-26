import { Injectable } from '@nestjs/common';
import { EvaluadorRiesgo } from '../interfaces/evaluador-riesgo.interface';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ResultadoEvaluacion } from '../entities/resultado-evaluacion.entity';

@Injectable()
export class EvaluadorRiesgoAltoService implements EvaluadorRiesgo {
  puntajeBase = 500;

  aplica(cliente: Cliente): boolean {
    const puntaje = cliente.puntajeCredito;
    return puntaje >= 500 && puntaje < 650;
  }

  evaluar(cliente: Cliente): ResultadoEvaluacion {
    const resultado = new ResultadoEvaluacion();

    const puntajeFinal = this.calcularPuntajeFinal(cliente);
    resultado.puntajeFinal = puntajeFinal;
    resultado.nivelRiesgo = this.determinarNivelRiesgo(puntajeFinal);

    // Criterios más estrictos para aprobar
    const montoSolicitado = cliente.montoSolicitado;
    const ingresos = cliente.getIngresoReferencial();
    const deudas = cliente.getMontoDeudas();
    const relacionDeudaIngreso = deudas / ingresos;

    resultado.aprobado =
      relacionDeudaIngreso < 0.3 && montoSolicitado <= ingresos * 12;

    resultado.tasaInteres = 18.5; // Tasa alta por riesgo
    resultado.plazoAprobado = Math.min(cliente.plazoEnMeses, 24); // Máximo 24 meses
    resultado.mensaje = resultado.aprobado
      ? 'Crédito aprobado con condiciones restrictivas'
      : 'Crédito rechazado por alto riesgo';

    return resultado;
  }

  calcularPuntajeFinal(cliente: Cliente): number {
    // Cálculo para clientes de alto riesgo
    let puntaje = cliente.puntajeCredito;

    // Ajustes según historial y deudas
    if (!cliente.esAptoParaCredito()) {
      puntaje -= 50;
    }

    return puntaje;
  }

  determinarNivelRiesgo(puntaje: number): string {
    return 'ALTO';
  }
}
