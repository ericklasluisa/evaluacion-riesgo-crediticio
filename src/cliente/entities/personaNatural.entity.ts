import { ChildEntity, Column } from 'typeorm';
import { Cliente } from './cliente.entity';

@ChildEntity('persona_natural')
export class PersonaNatural extends Cliente {
  @Column()
  edad: number;

  @Column('double')
  ingresoMensual: number;

  override getIngresoReferencial(): number {
    return this.ingresoMensual;
  }

  override esAptoParaCredito(): string {
    let puntaje = 100;
    this.puntajeCredito < 650 ? (puntaje -= 30) : puntaje;
    this.getMontoDeudas() > this.ingresoMensual * 0.4
      ? (puntaje -= 15)
      : puntaje;

    this.montoSolicitado > this.ingresoMensual * 0.5
      ? (puntaje -= 10)
      : puntaje;

    return puntaje >= 80 ? 'bajo' : puntaje >= 60 ? 'medio' : 'alto';
  }
}
