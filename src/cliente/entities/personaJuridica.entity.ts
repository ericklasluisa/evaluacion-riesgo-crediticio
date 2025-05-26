import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column } from 'typeorm';

export class PersonaJuridica extends Cliente {
  @Column()
  antiguedadAnios: number;
  @Column()
  ingresoAnual: number;
  @Column()
  empleados: number;

  override getIngresoReferencial(): number {
    return this.ingresoAnual;
  }

  override esAptoParaCredito(): string {
    let puntaje = 100;

    if (this.puntajeCredito < 650) {
      puntaje -= 30;
    }

    if (this.getMontoDeudas() > this.getIngresoReferencial() * 0.35) {
      puntaje -= 20;
    }

    if (this.montoSolicitado > this.getIngresoReferencial() * 0.3) {
      puntaje -= 15;
    }

    return puntaje >= 80
      ? 'riesgo bajo'
      : puntaje >= 60
        ? 'riesgo medio'
        : 'riesgo alto';
  }
}
