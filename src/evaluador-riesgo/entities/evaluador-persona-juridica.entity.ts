import { Cliente } from 'src/cliente/entities/cliente.entity';
import { PersonaJuridica } from 'src/cliente/entities/personaJuridica.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';
import { Entity } from 'typeorm';

@Entity('evaluadores_persona_juridica')
export class EvaluadorPersonaJuridica extends EvaluadorRiesgo {
  constructor() {
    super();
    this.puntajeBase = 70; // Valor base para personas jurídicas
  }

  aplica(cliente: Cliente): boolean {
    return cliente instanceof PersonaJuridica;
  }

  protected calcularPuntajeFinal(cliente: Cliente): number {
    const personaJuridica = cliente as PersonaJuridica;
    let puntaje = this.puntajeBase;

    // Evaluación basada en antigüedad
    if (personaJuridica.antiguedadAnios < 2) {
      puntaje -= 15; // Penalización por empresa nueva
    } else if (personaJuridica.antiguedadAnios > 10) {
      puntaje += 10; // Bonificación por empresa establecida
    }

    // Evaluación basada en puntaje de crédito
    puntaje += personaJuridica.puntajeCredito / 10;

    // Evaluación basada en tamaño de la empresa
    if (personaJuridica.empleados > 100) {
      puntaje += 10; // Empresa grande
    } else if (personaJuridica.empleados < 10) {
      puntaje -= 5; // Empresa muy pequeña
    }

    // Evaluación basada en capacidad de pago
    const capacidadPago =
      personaJuridica.ingresoAnual /
      12 /
      (personaJuridica.montoSolicitado / personaJuridica.plazoEnMeses);

    if (capacidadPago > 5) {
      puntaje += 15; // Excelente capacidad de pago
    } else if (capacidadPago > 3) {
      puntaje += 10;
    } else if (capacidadPago < 1.5) {
      puntaje -= 25; // Capacidad de pago comprometida
    }

    // Ajuste por deudas existentes
    const montoDeudas = personaJuridica.getMontoDeudas();
    const ratioDeudaIngreso = montoDeudas / (personaJuridica.ingresoAnual / 12);

    if (ratioDeudaIngreso > 0.7) {
      puntaje -= 20; // Alto endeudamiento
    }

    return Math.max(0, Math.min(100, puntaje)); // Puntaje entre 0 y 100
  }
}
