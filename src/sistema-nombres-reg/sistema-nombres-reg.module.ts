import { Module } from '@nestjs/common';
import { SistemaNombresRegService } from './sistema-nombres-reg.service';
import { SistemaNombresRegController } from './sistema-nombres-reg.controller';
import { SistemaUnidadRegModule } from 'src/sistema-unidad-reg/sistema-unidad-reg.module';

@Module({
  imports: [SistemaUnidadRegModule],
  controllers: [SistemaNombresRegController],
  providers: [SistemaNombresRegService],
  exports: [SistemaNombresRegService],
})
export class SistemaNombresRegModule {}
