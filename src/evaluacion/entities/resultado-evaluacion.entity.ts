import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('resultados_evaluacion')
export class ResultadoEvaluacion {
  @PrimaryGeneratedColumn({ name: 'id_resultado' })
  id: number;

  @Column({ name: 'puntajeObtenido' })
  puntajeFinal: number;

  @Column()
  nivelRiesgo: string;

  @Column()
  aprobado: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tasaInteres: number;

  @Column()
  plazoAprobado: number;

  @Column()
  mensaje: string;

  @CreateDateColumn()
  fechaEvaluacion: Date;

  @ManyToOne(() => Cliente, { onDelete: 'CASCADE' })
  cliente: Cliente;
}
