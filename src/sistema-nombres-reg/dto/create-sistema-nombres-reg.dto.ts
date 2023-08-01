import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { aut_NC_ENUM } from '../entities/sistema-nombres-reg.enum';
import { SistemaUnidadReg } from 'src/sistema-unidad-reg';

export class CreateSistemaNombresRegDto {
  @ApiProperty()
  @IsNumber()
  Num_unidad_reg: SistemaUnidadReg;

  @ApiProperty()
  @IsString()
  passnreg: string;

  @ApiProperty()
  @IsString()
  identificador: string;

  @ApiProperty()
  @IsString()
  datosgenerales: string;

  @ApiProperty()
  @IsEnum(aut_NC_ENUM)
  aut_NC: aut_NC_ENUM; //enum SI y NO

  @ApiProperty()
  @IsEnum(aut_NC_ENUM)
  deleted: aut_NC_ENUM; //enum SI y NO
}