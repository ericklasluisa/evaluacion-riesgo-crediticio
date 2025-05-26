import { Cliente } from 'src/cliente/entities/cliente.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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
