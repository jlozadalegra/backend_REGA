import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaProcDestDto } from './create-sistema-proc-dest.dto';

export class UpdateSistemaProcDestDto extends PartialType(
  CreateSistemaProcDestDto,
) {}
