import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SistemaProcDestService } from './sistema-proc-dest.service';
import { CreateSistemaProcDestDto } from './dto/create-sistema-proc-dest.dto';
import { UpdateSistemaProcDestDto } from './dto/update-sistema-proc-dest.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/auth.decorator';
@ApiTags("Modulo Procedencia o Destino")
@Auth()
@Controller('sistemaprocdest')
export class SistemaProcDestController {
  constructor(
    private readonly sistemaProcDestService: SistemaProcDestService,
  ) {}

  @Post()
  create(@Body() createSistemaProcDestDto: CreateSistemaProcDestDto) {
    return this.sistemaProcDestService.create(createSistemaProcDestDto);
  }

  @Get()
  findAll() {
    return this.sistemaProcDestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sistemaProcDestService.findOne(id);
  }

  @Put(':id')
  editRecord(
    @Param('id') id: number,
    @Body() updateSistemaProcDestDto: UpdateSistemaProcDestDto,
  ) {
    return this.sistemaProcDestService.editRecord(id, updateSistemaProcDestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sistemaProcDestService.remove(id);
  }
}
