import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaRegDto } from './create-sistema-reg.dto';

export class UpdateSistemaRegDto extends PartialType(CreateSistemaRegDto) {}
