import { Module } from '@nestjs/common';
import { SistemaTipSalService } from './sistema-tip-sal.service';
import { SistemaTipSalController } from './sistema-tip-sal.controller';

@Module({
  controllers: [SistemaTipSalController],
  providers: [SistemaTipSalService]
})
export class SistemaTipSalModule {}
