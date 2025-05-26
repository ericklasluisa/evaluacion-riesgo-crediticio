import { Injectable } from '@nestjs/common';
import { EvaluadorRiesgo } from '../interfaces/evaluador-riesgo.interface';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ResultadoEvaluacion } from '../entities/resultado-evaluacion.entity';

@Injectable()
export class EvaluadorRiesgoBajoService implements EvaluadorRiesgo {
  puntajeBase = 800;

  aplica(cliente: Cliente): boolean {
    const puntaje = cliente.puntajeCredito;
    return puntaje >= 800;
  }

  evaluar(cliente: Cliente): ResultadoEvaluacion {
    const resultado = new ResultadoEvaluacion();

    const puntajeFinal = this.calcularPuntajeFinal(cliente);
    resultado.puntajeFinal = puntajeFinal;
    resultado.nivelRiesgo = this.determinarNivelRiesgo(puntajeFinal);

    // Criterios favorables para aprobar
    const montoSolicitado = cliente.montoSolicitado;
    const ingresos = cliente.getIngresoReferencial();
    const deudas = cliente.getMontoDeudas();
    const relacionDeudaIngreso = deudas / ingresos;

    resultado.aprobado =
      relacionDeudaIngreso < 0.6 && montoSolicitado <= ingresos * 36;

    resultado.tasaInteres = 8.5; // Tasa baja por bajo riesgo
    resultado.plazoAprobado = cliente.plazoEnMeses; // Se aprueba el plazo completo
    resultado.mensaje = resultado.aprobado
      ? 'Crédito aprobado con condiciones preferenciales'
      : 'Crédito rechazado a pesar de buen historial';

    return resultado;
  }

  calcularPuntajeFinal(cliente: Cliente): number {
    // Cálculo para clientes de bajo riesgo
    let puntaje = cliente.puntajeCredito;

    // Ajustes positivos adicionales por su buen perfil
    if (cliente.esAptoParaCredito()) {
      puntaje += 50;
    }

    return puntaje;
  }

  determinarNivelRiesgo(puntaje: number): string {
    return 'BAJO';
  }
}
