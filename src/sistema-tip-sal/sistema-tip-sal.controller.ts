import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SistemaTipSalService } from './sistema-tip-sal.service';
import { CreateSistemaTipSalDto } from './dto/create-sistema-tip-sal.dto';
import { UpdateSistemaTipSalDto } from './dto/update-sistema-tip-sal.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/auth.decorator';

@ApiTags("Modulo soporte de Entrada o Salidad")
@Auth()
@Controller('sistema-tip-sal')
export class SistemaTipSalController {
  constructor(private readonly sistemaTipSalService: SistemaTipSalService) {}

  @Post()
  create(@Body() createSistemaTipSalDto: CreateSistemaTipSalDto) {
    return this.sistemaTipSalService.create(createSistemaTipSalDto);
  }

  @Get()
  findAll() {
    return this.sistemaTipSalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sistemaTipSalService.findOne(id);
  }

  @Put(':id')
  editRecord(
    @Param('id') id: number,
    @Body() updateSistemaTipSalDto: UpdateSistemaTipSalDto,
  ) {
    return this.sistemaTipSalService.editRecord(id, updateSistemaTipSalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sistemaTipSalService.remove(id);
  }
}
