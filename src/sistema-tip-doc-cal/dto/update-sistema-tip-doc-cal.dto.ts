import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaTipDocCalDto } from './create-sistema-tip-doc-cal.dto';

export class UpdateSistemaTipDocCalDto extends PartialType(
  CreateSistemaTipDocCalDto,
) {}
