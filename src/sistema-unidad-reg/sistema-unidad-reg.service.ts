import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateSistemaUnidadRegDto } from './dto/create-sistema-unidad-reg.dto';
import { UpdateSistemaUnidadRegDto } from './dto/update-sistema-unidad-reg.dto';
import { SistemaUnidadReg } from './entities/sistema-unidad-reg.entity';
import { Not } from 'typeorm';

@Injectable()
export class SistemaUnidadRegService {
  private UnidadRegRepo = AppDataSource.getRepository(SistemaUnidadReg);

  //Insertar registros--------------------------------------------------------------------
  async create(newrecord: CreateSistemaUnidadRegDto) {
    const resul = await this.UnidadRegRepo.save(newrecord);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: resul,
    };
  }

  //Obtener todos los registros para el login-----------------------------------------------------------
  async findLogin() {
    const found = await this.UnidadRegRepo.find({
      order: {
        descripcionureg: 'ASC',
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Obtener todos los registros-----------------------------------------------------------
  async findAll() {
    const found = await this.UnidadRegRepo.find({
      where: {
        descripcionureg: Not('Administración'),
      },
      order: {
        descripcionureg: 'ASC',
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Buscar un único registro en la tabla--------------------------------------------------
  async findOne(id: number) {
    const found = await this.UnidadRegRepo.findOne({
      where: { id: id },
      relations: {
        SistemaNombresReg: true,
      },
    });

    if (found == null)
      throw new HttpException('Unidad no encontrada', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Actualizar registros------------------------------------------------------------------
  async editRecord(id: number, update: UpdateSistemaUnidadRegDto) {
    const found = await this.UnidadRegRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.UnidadRegRepo.update(id, update);

    const modified = await this.UnidadRegRepo.findOne({
      where: { id: id },
      relations: {
        sistemareg: true,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: modified,
    };
  }

  async remove(id: number) {
    const found = await this.UnidadRegRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.UnidadRegRepo.remove(found),
    };
  }
}
