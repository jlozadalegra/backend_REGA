import { isString, IsString } from 'class-validator';

export class CreateSistemaTipSalDto {
  @IsString()
  desc_tipsal: string;
}
