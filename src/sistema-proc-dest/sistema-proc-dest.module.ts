import { Module } from '@nestjs/common';
import { SistemaProcDestService } from './sistema-proc-dest.service';
import { SistemaProcDestController } from './sistema-proc-dest.controller';

@Module({
  controllers: [SistemaProcDestController],
  providers: [SistemaProcDestService]
})
export class SistemaProcDestModule {}
