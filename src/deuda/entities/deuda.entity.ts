import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity('deudas')
export class Deuda {
  @PrimaryGeneratedColumn({ name: 'id_deuda' })
  id: number;
  @Column()
  monto: number;
  @Column()
  plazoMeses: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.deudasActuales)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}
