import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateSistemaTipSalDto } from './dto/create-sistema-tip-sal.dto';
import { UpdateSistemaTipSalDto } from './dto/update-sistema-tip-sal.dto';
import { SistemaTipSal } from './entities/sistema-tip-sal.entity';

@Injectable()
export class SistemaTipSalService {
  private TipSalRepo = AppDataSource.getRepository(SistemaTipSal);

  //Insertar registros---------------------------------------------------------------------
  async create(
    newrecord: CreateSistemaTipSalDto,
  ): Promise<SistemaTipSal | any> {
    const response = await this.TipSalRepo.save(newrecord);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: response,
    };
  }

  //Obtener registros----------------------------------------------------------------------
  async findAll() {
    const found = await this.TipSalRepo.find();

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
    const found = await this.TipSalRepo.findOne({
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
  async editRecord(id: number, update: UpdateSistemaTipSalDto) {
    const found = await this.TipSalRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.TipSalRepo.update(id, update);

    const modified = await this.TipSalRepo.findOne({
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
    const found = await this.TipSalRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.TipSalRepo.remove(found),
    };
  }
}
