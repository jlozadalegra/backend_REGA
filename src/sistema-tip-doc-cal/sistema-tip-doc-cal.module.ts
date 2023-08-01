import { Module } from '@nestjs/common';
import { SistemaTipDocCalService } from './sistema-tip-doc-cal.service';
import { SistemaTipDocCalController } from './sistema-tip-doc-cal.controller';

@Module({
  controllers: [SistemaTipDocCalController],
  providers: [SistemaTipDocCalService]
})
export class SistemaTipDocCalModule {}
