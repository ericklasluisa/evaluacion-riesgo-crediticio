import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EvaluadorRiesgo {
  @PrimaryGeneratedColumn({ name: 'id_evaluador_riesgo' })
  id: number;

  @Column()
  puntajeBase: number;

  aplica(cliente: Cliente): boolean {
    return this.puntajeBase >= 0;
  }

  evaluar(cliente: Cliente): any {
    const puntaje = this.calcularPuntajeFinal(cliente);
    return {
      puntajeFinal: puntaje, // Change to puntajeFinal to match the entity field name
      nivelRiesgo: this.determinarNivelRiesgo(puntaje),
      aprobado: puntaje >= 60, // Approve if score is 60 or higher
      mensaje: this.generarMensaje(puntaje),
      tasaInteres: this.calcularTasaInteres(puntaje),
      plazoAprobado: this.determinarPlazoAprobado(
        cliente.plazoEnMeses,
        puntaje,
      ),
    };
  }

  protected calcularPuntajeFinal(cliente: Cliente): number {
    // Implementation that calculates the final score based on client data
    let puntaje = this.puntajeBase;

    // Add logic based on client's credit score
    puntaje += cliente.puntajeCredito * 0.3;

    // Consider debt ratio
    const ingresoReferencial = cliente.getIngresoReferencial();
    if (ingresoReferencial > 0) {
      const montoDeudas = cliente.getMontoDeudas();
      const ratioDeuda = montoDeudas / ingresoReferencial;
      if (ratioDeuda < 0.3) puntaje += 20;
      else if (ratioDeuda < 0.5) puntaje += 10;
      else if (ratioDeuda > 0.7) puntaje -= 20;
    }

    // Add bonus if client is eligible for credit
    if (cliente.esAptoParaCredito()) {
      puntaje += 15;
    }

    return Math.min(100, Math.max(0, puntaje)); // Ensure score is between 0-100
  }

  private determinarNivelRiesgo(puntaje: number): string {
    if (puntaje >= 80) {
      return 'BAJO';
    } else if (puntaje >= 60) {
      return 'MEDIO';
    } else {
      return 'ALTO';
    }
  }

  private generarMensaje(puntaje: number): string {
    if (puntaje >= 80) {
      return 'Cliente con excelente perfil crediticio';
    } else if (puntaje >= 60) {
      return 'Cliente con perfil crediticio aceptable';
    } else {
      return 'Cliente con alto riesgo crediticio';
    }
  }

  private calcularTasaInteres(puntaje: number): number {
    if (puntaje >= 80) {
      return 5.0; // Lower interest rate for low risk
    } else if (puntaje >= 60) {
      return 8.5; // Medium interest rate
    } else {
      return 12.0; // Higher interest rate for high risk
    }
  }

  private determinarPlazoAprobado(
    plazoSolicitado: number,
    puntaje: number,
  ): number {
    if (puntaje >= 80) {
      return plazoSolicitado; // Approve full term for low risk
    } else if (puntaje >= 60) {
      return Math.min(plazoSolicitado, 36); // Cap at 36 months for medium risk
    } else {
      return Math.min(plazoSolicitado, 24); // Cap at 24 months for high risk
    }
  }
}
