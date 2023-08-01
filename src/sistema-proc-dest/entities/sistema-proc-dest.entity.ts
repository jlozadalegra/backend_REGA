import { SistemaReg } from 'src/sistema-reg';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DEL_SIT } from './sistema-proc-dest.enum';

@Unique('procdest_uq', [
  'descripcionpdest',    
])

@Entity('sistema_proc_dest')
export class SistemaProcDest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 4,
    default: '0',
  })
  Co_pdest: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  descripcionpdest: string;

  @Column({
    type: 'enum',
    enum: DEL_SIT,
    default: [DEL_SIT.NO],
  })
  del_sit: DEL_SIT;

  @OneToMany(() => SistemaReg, (sistemaReg) => sistemaReg.Co_pdest)
  sistemareg: SistemaReg[];
}
