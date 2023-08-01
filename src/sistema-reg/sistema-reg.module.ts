import { Module } from '@nestjs/common';
import { SistemaRegService } from './sistema-reg.service';
import { SistemaRegController } from './sistema-reg.controller';

@Module({
  controllers: [SistemaRegController],
  providers: [SistemaRegService]
})
export class SistemaRegModule {}
