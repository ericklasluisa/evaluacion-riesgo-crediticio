import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity('historial_evaluaciones')
export class HistorialEvaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteNombre: string;

  @Column()
  tipoCliente: string;

  @Column()
  montoSolicitado: number;

  @Column()
  plazoEnMeses: number;

  @Column()
  nivelRiesgo: string;

  @Column()
  aprobado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaConsulta: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
