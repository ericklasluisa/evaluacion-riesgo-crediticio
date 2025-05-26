import { Deuda } from 'src/deuda/entities/deuda.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  OneToMany,
} from 'typeorm';

@Entity('clientes')
@TableInheritance({ column: { type: 'varchar', name: 'tipo_cliente' } })
export abstract class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  puntajeCredito: number;

  @Column()
  montoSolicitado: number;

  @Column()
  plazoEnMeses: number;

  // Relaciones
  @OneToMany(() => Deuda, (deuda) => deuda.cliente)
  deudasActuales: Deuda[];

  // Método para obtener el monto total de deudas
  getMontoDeudas(): number {
    if (!this.deudasActuales || this.deudasActuales.length === 0) {
      return 0;
    }
    return this.deudasActuales.reduce((total, deuda) => total + deuda.monto, 0);
  }

  // Métodos abstractos que deben ser implementados por las subclases
  abstract getIngresoReferencial(): number;

  abstract esAptoParaCredito(): boolean;
}
