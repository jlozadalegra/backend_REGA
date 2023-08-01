import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaTipSalDto } from './create-sistema-tip-sal.dto';

export class UpdateSistemaTipSalDto extends PartialType(
  CreateSistemaTipSalDto,
) {}
