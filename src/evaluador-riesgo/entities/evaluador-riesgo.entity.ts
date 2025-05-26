import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EvaluadorRiesgo {
  @PrimaryGeneratedColumn({ name: 'id_evaluador_riesgo' })
  id: number;
  @Column()
  puntajeBase: number;

  aplica(cliente: Cliente): boolean {
    return this.puntajeBase >= 0;
  }
  evaluar(cliente: Cliente): any {
    return {};
  }

  private calcularPuntajeFinal(cliente: Cliente): number {
    return cliente.esAptoParaCredito();
  }

  private determinarNivelRiesgo(puntaje: number): string {
    if (puntaje >= 80) {
      return 'bajo';
    } else if (puntaje >= 60) {
      return 'medio';
    } else {
      return 'alto';
    }
  }
}
