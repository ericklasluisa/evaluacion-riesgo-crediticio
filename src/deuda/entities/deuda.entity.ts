export class Deuda {
    @PrimaryGeneratedColumn({ name: 'id_deuda' })
    id: number;
    @Column()
    monto: number;
    @Column()
    plazoMeses: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;
}
