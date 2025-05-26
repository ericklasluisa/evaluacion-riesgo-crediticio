abstract class ClienteModel {
    nombre: string;
    puntajeCredito: number;
    deudasActuales: string;
    montoSolicitado: number;
    plazoEnMeses: number;

    getIngresoReferencial(): number {};
    esAptoParaCredito(): boolean {};
    getMontoDeudas(): number {};
}