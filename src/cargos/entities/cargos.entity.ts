import { SistemaNombresReg } from 'src/sistema-nombres-reg';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cargos')
export class cargos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, default: '' })
  cargos: string;

  @OneToMany(
    () => SistemaNombresReg,
    (SistemaNombresReg) => SistemaNombresReg.idcargo,
  )
  SistemaNombresReg: SistemaNombresReg[];
}
