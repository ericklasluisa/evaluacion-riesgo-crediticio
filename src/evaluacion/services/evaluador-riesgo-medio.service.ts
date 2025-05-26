import { Injectable } from '@nestjs/common';
import { EvaluadorRiesgo } from '../interfaces/evaluador-riesgo.interface';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ResultadoEvaluacion } from '../entities/resultado-evaluacion.entity';

@Injectable()
export class EvaluadorRiesgoMedioService implements EvaluadorRiesgo {
  puntajeBase = 650;

  aplica(cliente: Cliente): boolean {
    const puntaje = cliente.puntajeCredito;
    return puntaje >= 650 && puntaje < 800;
  }

  evaluar(cliente: Cliente): ResultadoEvaluacion {
    const resultado = new ResultadoEvaluacion();

    const puntajeFinal = this.calcularPuntajeFinal(cliente);
    resultado.puntajeFinal = puntajeFinal;
    resultado.nivelRiesgo = this.determinarNivelRiesgo(puntajeFinal);

    // Criterios moderados para aprobar
    const montoSolicitado = cliente.montoSolicitado;
    const ingresos = cliente.getIngresoReferencial();
    const deudas = cliente.getMontoDeudas();
    const relacionDeudaIngreso = deudas / ingresos;

    resultado.aprobado =
      relacionDeudaIngreso < 0.45 && montoSolicitado <= ingresos * 24;

    resultado.tasaInteres = 12.5; // Tasa media
    resultado.plazoAprobado = Math.min(cliente.plazoEnMeses, 36); // Máximo 36 meses
    resultado.mensaje = resultado.aprobado
      ? 'Crédito aprobado con condiciones estándar'
      : 'Crédito rechazado por relación deuda-ingreso o monto excesivo';

    return resultado;
  }

  calcularPuntajeFinal(cliente: Cliente): number {
    // Cálculo para clientes de riesgo medio
    let puntaje = cliente.puntajeCredito;

    // Ajustes según historial y deudas
    if (cliente.esAptoParaCredito()) {
      puntaje += 20;
    }

    return puntaje;
  }

  determinarNivelRiesgo(puntaje: number): string {
    return 'MEDIO';
  }
}
