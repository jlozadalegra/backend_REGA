import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SistemaUnidadRegService } from './sistema-unidad-reg.service';
import { CreateSistemaUnidadRegDto } from './dto/create-sistema-unidad-reg.dto';
import { UpdateSistemaUnidadRegDto } from './dto/update-sistema-unidad-reg.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/auth.decorator';

@ApiTags('modulo Unidades')
@Controller('units')
export class SistemaUnidadRegController {
  constructor(
    private readonly sistemaUnidadRegService: SistemaUnidadRegService,
  ) {}

  @Auth()
  @Post()
  create(@Body() createSistemaUnidadRegDto: CreateSistemaUnidadRegDto) {
    return this.sistemaUnidadRegService.create(createSistemaUnidadRegDto);
  }

  @Get('login')
  findLogin() {
    return this.sistemaUnidadRegService.findLogin();
  }

  @Get()
  findAll() {
    return this.sistemaUnidadRegService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sistemaUnidadRegService.findOne(id);
  }

  @Auth()
  @Put(':id')
  editRecord(
    @Param('id') id: number,
    @Body() updateSistemaUnidadRegDto: UpdateSistemaUnidadRegDto,
  ) {
    return this.sistemaUnidadRegService.editRecord(
      id,
      updateSistemaUnidadRegDto,
    );
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sistemaUnidadRegService.remove(id);
  }
}
