import { SistemaReg } from 'src/sistema-reg';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique('doccal_uq', ['desc_docu'])
@Entity('sistema_tipdocumcal')
export class SistemaTipDocCal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 4, default: '' })
  Co_docu: string;

  @Column({ type: 'varchar', length: 50 })
  desc_docu: string;

  @OneToMany(() => SistemaReg, (sistemaReg) => sistemaReg.Co_tdoc)
  sistemareg: SistemaReg[];
}
