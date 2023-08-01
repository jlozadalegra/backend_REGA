import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DEL_SIT } from '../entities/sistema-proc-dest.enum';

export class CreateSistemaProcDestDto {
  @IsString()
  descripcionpdest: string;

  @IsEnum(DEL_SIT)
  del_sit: DEL_SIT;
}
