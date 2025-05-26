import { Cliente } from 'src/cliente/entities/cliente.entity';
import { PersonaNatural } from 'src/cliente/entities/personaNatural.entity';
import { EvaluadorRiesgo } from './evaluador-riesgo.entity';
import { Entity } from 'typeorm';

@Entity('evaluadores_persona_natural')
export class EvaluadorPersonaNatural extends EvaluadorRiesgo {
  constructor() {
    super();
    this.puntajeBase = 60; // Valor base para personas naturales
  }

  aplica(cliente: Cliente): boolean {
    return cliente instanceof PersonaNatural;
  }

  protected calcularPuntajeFinal(cliente: Cliente): number {
    const personaNatural = cliente as PersonaNatural;
    let puntaje = this.puntajeBase;

    // Evaluación basada en edad
    if (personaNatural.edad < 25) {
      puntaje -= 10; // Penalización por edad joven (mayor riesgo)
    } else if (personaNatural.edad > 60) {
      puntaje -= 5; // Pequeña penalización por edad cercana a jubilación
    }

    // Evaluación basada en puntaje de crédito
    puntaje += personaNatural.puntajeCredito / 10;

    // Evaluación basada en capacidad de pago
    const capacidadPago =
      personaNatural.ingresoMensual /
      (personaNatural.montoSolicitado / personaNatural.plazoEnMeses);

    if (capacidadPago > 3) {
      puntaje += 20; // Buena capacidad de pago
    } else if (capacidadPago > 2) {
      puntaje += 10;
    } else if (capacidadPago < 1) {
      puntaje -= 30; // Mala capacidad de pago
    }

    // Ajuste por deudas existentes
    const montoDeudas = personaNatural.getMontoDeudas();
    const ratioDeudaIngreso = montoDeudas / personaNatural.ingresoMensual;

    if (ratioDeudaIngreso > 0.5) {
      puntaje -= 20; // Alto endeudamiento
    }

    return Math.max(0, Math.min(100, puntaje)); // Puntaje entre 0 y 100
  }
}
