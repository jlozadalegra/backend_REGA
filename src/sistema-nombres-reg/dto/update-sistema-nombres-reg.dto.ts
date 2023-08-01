import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaNombresRegDto } from './create-sistema-nombres-reg.dto';

export class UpdateSistemaNombresRegDto extends PartialType(
  CreateSistemaNombresRegDto,
) {}
