import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaUnidadRegDto } from './create-sistema-unidad-reg.dto';

export class UpdateSistemaUnidadRegDto extends PartialType(
  CreateSistemaUnidadRegDto,
) {}
