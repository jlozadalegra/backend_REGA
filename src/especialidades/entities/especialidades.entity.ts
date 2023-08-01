import { SistemaNombresReg } from "src/sistema-nombres-reg";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('especialidades')
export class especialidades {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 60, default: ''})
    especialidades: string;

    @OneToMany(
        () => SistemaNombresReg,
        (SistemaNombresReg) => SistemaNombresReg.idespecialidad,
      )
      SistemaNombresReg: SistemaNombresReg[];
}