import { Column, ChildEntity } from 'typeorm';
import { Cliente } from './cliente.entity';

@ChildEntity()
export class PersonaJuridica extends Cliente {
  @Column()
  antiguedadAnios: number;

  @Column()
  ingresoAnual: number;

  @Column()
  empleados: number;

  getIngresoReferencial(): number {
    // Lógica para calcular ingreso referencial para persona jurídica
    return this.ingresoAnual / 12; // Aproximación del ingreso mensual
  }

  esAptoParaCredito(): boolean {
    // Lógica para determinar si la persona jurídica es apta para crédito
    // Por ejemplo: si tiene suficiente tiempo en el mercado, ingresos suficientes, etc.
    const montoDeudas = this.getMontoDeudas();
    const capacidadPago = (this.ingresoAnual / 12) * 0.5; // 50% del promedio mensual

    return montoDeudas < capacidadPago && this.antiguedadAnios >= 2;
  }
}
