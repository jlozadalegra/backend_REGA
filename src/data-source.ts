import { DataSource } from 'typeorm';
import { SistemaNombresReg } from './sistema-nombres-reg';
import { SistemaProcDest } from './sistema-proc-dest';
import { SistemaReg } from './sistema-reg';
import { SistemaTipDocCal } from './sistema-tip-doc-cal';
import { SistemaTipSal } from './sistema-tip-sal/entities/sistema-tip-sal.entity';
import { SistemaUnidadReg } from './sistema-unidad-reg';

import 'dotenv/config'; 

import { cargos } from './cargos/entities/cargos.entity';
import { especialidades } from './especialidades/entities/especialidades.entity';
import { areas } from './areas/entities/areas.entity';

export const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: true,
  entities: [
    SistemaReg,
    SistemaNombresReg,
    SistemaProcDest,
    SistemaTipDocCal,
    SistemaTipSal,
    SistemaUnidadReg,
    cargos,
    especialidades,
    areas
  ]    
});
