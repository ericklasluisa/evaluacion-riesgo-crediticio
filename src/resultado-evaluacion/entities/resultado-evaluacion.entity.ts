import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResultadoEvaluacion {
  @PrimaryGeneratedColumn({ name: 'id_resultado_evaluacion' })
  id: number;

  @Column()
  nivelRiesgo: string;

  @Column()
  aprobado: boolean;

  @Column()
  puntajeFinal: number;

  @Column()
  mensaje: string;

  @Column('double')
  tasaInteres: number;

  @Column()
  plazoAprobado: number;
}
