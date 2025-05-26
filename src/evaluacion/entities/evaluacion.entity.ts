import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity('evaluaciones')
export class Evaluacion {
  @PrimaryGeneratedColumn({ name: 'id_evaluacion' })
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column()
  puntajeFinal: number;

  @Column()
  nivelRiesgo: string;

  @Column()
  aprobado: boolean;

  @Column()
  mensaje: string;

  @Column('decimal', { precision: 5, scale: 2 })
  tasaInteres: number;

  @Column()
  plazoAprobado: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEvaluacion: Date;
}
