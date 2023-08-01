import { SistemaReg } from 'src/sistema-reg';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique('tipsal_uq', ['desc_tipsal'])
@Entity('sistema_tipsal')
export class SistemaTipSal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 6, default: '' })
  Co_tipsal: string;

  @Column({ type: 'varchar', length: 25 })
  desc_tipsal: string;

  @OneToMany((type) => SistemaReg, (sistemaReg) => sistemaReg.Co_tipsal)
  sistemareg: SistemaReg[];
}
