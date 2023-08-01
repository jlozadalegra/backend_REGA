import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SistemaNombresRegService } from './sistema-nombres-reg.service';
import { CreateSistemaNombresRegDto } from './dto/create-sistema-nombres-reg.dto';
import { UpdateSistemaNombresRegDto } from './dto/update-sistema-nombres-reg.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/auth.decorator';

@ApiTags('Control de usuarios')
@Controller('users')
export class SistemaNombresRegController {
  constructor(
    private readonly sistemaNombresRegService: SistemaNombresRegService,
  ) {}

  @Get()
  findAll() {
    return this.sistemaNombresRegService.findAll();
  }

  @Get('unit/:num')
  async findAllNumUnidad(@Param('num') num: string) {
    return await this.sistemaNombresRegService.findAllNumUnidad(num);
  }

  @Auth()
  @Post()
  async create(@Body() createSistemaNombresRegDto: CreateSistemaNombresRegDto) {
    return await this.sistemaNombresRegService.create(
      createSistemaNombresRegDto,
    );
  }

  @Auth()
  @Get(':identf')
  findOne(@Param('identf') identf: string) {
    return this.sistemaNombresRegService.findOne(identf);
  }

  @Auth()
  @Put(':id')
  editRecord(
    @Param('id') id: number,
    @Body() updateSistemaNombresRegDto: UpdateSistemaNombresRegDto,
  ) {
    return this.sistemaNombresRegService.editRecord(
      id,
      updateSistemaNombresRegDto,
    );
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sistemaNombresRegService.remove(id);
  }
}
