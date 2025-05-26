import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('deudas')
export class Deuda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  plazoMeses: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.deudasActuales)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
