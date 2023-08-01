import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSistemaUnidadRegDto {
  @ApiProperty()
  @IsString()
  Num_unidad_reg: string;

  @ApiProperty()
  @IsString()
  descripcionureg: string;
}
