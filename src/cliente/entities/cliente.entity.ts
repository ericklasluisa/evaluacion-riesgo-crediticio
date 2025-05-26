import { Deuda } from 'src/deuda/entities/deuda.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  //Relaciones
  @OneToMany(() => Deuda, (deuda) => deuda.cliente)
  deudasActuales: Deuda[];

  getIngresoReferencial(): number {
    throw new Error('Método debe ser implementado por la subclase');
  }
  esAptoParaCredito(): boolean {
    throw new Error('Método debe ser implementado por la subclase');
  }
  getMontoDeudas(): number {
    return this.deudasActuales.reduce((total, deuda) => total + deuda.monto, 0);
  }
}
