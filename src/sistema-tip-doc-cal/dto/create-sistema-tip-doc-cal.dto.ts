import { IsString } from 'class-validator';

export class CreateSistemaTipDocCalDto {
  @IsString()
  Co_docu: string;

  @IsString()
  desc_docu: string;
}
