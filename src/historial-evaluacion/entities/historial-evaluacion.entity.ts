import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HistorialEvaluacion {
  @PrimaryGeneratedColumn({ name: 'id_historial_evaluacion' })
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

  @Column()
  fechaConsulta: Date = new Date();

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
