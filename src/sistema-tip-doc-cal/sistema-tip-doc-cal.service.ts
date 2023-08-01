import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateSistemaTipDocCalDto } from './dto/create-sistema-tip-doc-cal.dto';
import { UpdateSistemaTipDocCalDto } from './dto/update-sistema-tip-doc-cal.dto';
import { SistemaTipDocCal } from './entities/sistema-tip-doc-cal.entity';

@Injectable()
export class SistemaTipDocCalService {
  private TipDocCalRepo = AppDataSource.getRepository(SistemaTipDocCal);

  //Insertar registros-------------------------------------------------------------------
  async create(
    newrecord: CreateSistemaTipDocCalDto,
  ): Promise<SistemaTipDocCal | any> {
    const response = await this.TipDocCalRepo.save(newrecord);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: response,
    };
  }

  //Obtener todos los registros-----------------------------------------------------------
  async findAll() {
    const found = await this.TipDocCalRepo.find({
      order:{
        desc_docu: 'ASC'
      }
    });

    if (!found.length) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Buscar un único registro en la tabla---------------------------------------
  async findOne(id: number) {
    const found = await this.TipDocCalRepo.findOne({
      where: { id: id },
    });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Actualizar registros------------------------------------------------------------------
  async editRecord(id: number, update: UpdateSistemaTipDocCalDto) {
    const found = await this.TipDocCalRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.TipDocCalRepo.update(id, update);

    const modified = await this.TipDocCalRepo.findOne({
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

  //Eliminar registros---------------------------------------------------------------------
  async remove(id: number) {
    const found = await this.TipDocCalRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.TipDocCalRepo.remove(found),
    };
  }
}
