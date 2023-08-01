import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateSistemaProcDestDto } from './dto/create-sistema-proc-dest.dto';
import { UpdateSistemaProcDestDto } from './dto/update-sistema-proc-dest.dto';
import { SistemaProcDest } from './entities/sistema-proc-dest.entity';

@Injectable()
export class SistemaProcDestService {
  private ProcDestRepo = AppDataSource.getRepository(SistemaProcDest);

  //Insertar registros--------------------------------------------------------------------
  async create(
    newrecord: CreateSistemaProcDestDto,
  ): Promise<SistemaProcDest | any> {
    const response = await this.ProcDestRepo.save(newrecord);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: response,
    };
  }

  //Buscar todos los registros-------------------------------------------------------------
  async findAll() {
    const found = await this.ProcDestRepo.find({
      order: {
        descripcionpdest: 'ASC',
      },
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

  //Buscar un único registro en la tabla---------------------------------------------------
  async findOne(id: number) {
    const found = await this.ProcDestRepo.findOne({
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

  //Actualizar los registros----------------------------------------------------------
  async editRecord(id: number, update: UpdateSistemaProcDestDto) {
    const found = await this.ProcDestRepo.findOneBy({ id: id });

    if (found === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Destino Incorrecto',
        data: found,
      };
    }

    await this.ProcDestRepo.update(id, update);

    const modified = await this.ProcDestRepo.findOne({
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

  //Eliminar registros---------------------------------------------------------------
  async remove(id: number) {
    const found = await this.ProcDestRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.ProcDestRepo.remove(found),
    };
  }
}
