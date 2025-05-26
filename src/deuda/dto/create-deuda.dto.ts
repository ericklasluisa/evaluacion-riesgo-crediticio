export class CreateDeudaDto {
    @IsNotEmpty({ message: 'El monto es requerido' })
    @IsNumber(
        {
        maxDecimalPlaces: 2,
        },
        { message: 'El monto debe tener máximo 2 decimales' },
    )
    monto: number;
    @IsNotEmpty({ message: 'El plazo es requerido' })
    @IsNumber(
        {
        maxDecimalPlaces: 0,
        },
        { message: 'El plazo debe ser un número entero' },
    )
    plazoMeses: number;
    @IsNotEmpty({ message: 'El id del cliente es requerido' })
    @IsNumber(
        {
        maxDecimalPlaces: 0,
        },
        { message: 'El id del cliente debe ser un número entero' },
    )
    idCliente: number;
}
