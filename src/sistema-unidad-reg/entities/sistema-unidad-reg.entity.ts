import { SistemaReg } from 'src/sistema-reg';
import { SistemaNombresReg } from 'src/sistema-nombres-reg';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique('unit_uq', ['Num_unidad_reg'])
@Entity('sistema_unidadreg')
export class SistemaUnidadReg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 4 })
  Num_unidad_reg: string;

  @Column({ type: 'varchar', length: 100 })
  descripcionureg: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  encab_rega: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  Ubic_docu: string;

  @OneToMany(
    () => SistemaNombresReg,
    (SistemaNombresReg) => SistemaNombresReg.Num_unidad_reg,
  )
  SistemaNombresReg: SistemaNombresReg[];

  @OneToMany(() => SistemaReg, (sistemaReg) => sistemaReg.Num_unidad_reg)
  sistemareg: SistemaReg[];
}
