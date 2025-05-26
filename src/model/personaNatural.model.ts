import { Cliente } from "src/model/cliente.model";

class PersonaNatural extends Cliente {
    edad: number;
    ingresoMensual: number;

    getIngresoReferencial(): number {
        return this.ingresoMensual;
    };
    esAptoParaCredito(): boolean {};
}