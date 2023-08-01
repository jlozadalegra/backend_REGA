import { SistemaNombresReg } from 'src/sistema-nombres-reg';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('areas')
export class areas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  areas: string;

  @OneToMany(
    () => SistemaNombresReg,
    (SistemaNombresReg) => SistemaNombresReg.idarea,
  )
  SistemaNombresReg: SistemaNombresReg[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
