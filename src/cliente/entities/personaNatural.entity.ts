import { Column, ChildEntity } from 'typeorm';
import { Cliente } from './cliente.entity';

@ChildEntity()
export class PersonaNatural extends Cliente {
  @Column()
  edad: number;

  @Column()
  ingresoMensual: number;

  getIngresoReferencial(): number {
    // Lógica para calcular ingreso referencial para persona natural
    return this.ingresoMensual;
  }

  esAptoParaCredito(): boolean {
    // Lógica para determinar si la persona natural es apta para crédito
    // Por ejemplo: si sus ingresos son suficientes y no tiene muchas deudas
    const montoDeudas = this.getMontoDeudas();
    const capacidadPago = this.ingresoMensual * 0.4; // 40% del ingreso mensual

    return montoDeudas < capacidadPago && this.edad >= 18;
  }
}
