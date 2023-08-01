import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateSistemaNombresRegDto } from './dto/create-sistema-nombres-reg.dto';
import { UpdateSistemaNombresRegDto } from './dto/update-sistema-nombres-reg.dto';
import { SistemaNombresReg } from './entities/sistema-nombres-reg.entity';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';
import { aut_NC_ENUM } from './entities/sistema-nombres-reg.enum';

@Injectable()
export class SistemaNombresRegService {
  private NombresRegRepo = AppDataSource.getRepository(SistemaNombresReg);

  //Obtener todos los usuarios----------------------------------------
  async findAll() {
    const found = await this.NombresRegRepo.find({
      relations: {
        Num_unidad_reg: true,
      },
      where: {
        identificador: Not('Administrador'),
      },
      order: {
        datosgenerales: 'ASC',
      },
    });

    if (!found.length) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Registros no encontrados',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Obtener Todos los usuarios de una unidad----------------------------------
  async findAllNumUnidad(num: string) {
    const found = await this.NombresRegRepo.find({
      relations: {
        Num_unidad_reg: true,
      },
      where: {
        Num_unidad_reg: { id: num as any },
        deleted: Not(aut_NC_ENUM.SI),
      },
      order: {
        datosgenerales: 'ASC',
      },
    });

    if (!found.length) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Registros no encontrados',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Insertar reistros----------------------------------------------------------------------
  async create(
    newrecord: CreateSistemaNombresRegDto,
  ): Promise<SistemaNombresReg | any> {
    if (newrecord.passnreg) {
      const saltOrRounds = 12;
      newrecord.passnreg = await bcrypt.hash(newrecord.passnreg, saltOrRounds);
    }

    //Validar que el identificador de usuario no este repetido
    const validateuser = await this.NombresRegRepo.findOne({
      where: { identificador: newrecord.identificador },
    });

    if (validateuser !== null) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'El usuario ya existe en la Base de Datos',
        data: newrecord,
      };
    }

    const result = await this.NombresRegRepo.save(newrecord);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: result,
    };
  }

  //Buscar un único registro en la tabla---------------------------------------------------
  async findOne(identf: string) {
    const user = await this.NombresRegRepo.findOne({
      where: { identificador: identf },
      relations: {
        Num_unidad_reg: true,
      },
    });

    if (user === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Nombre de usuario incorrecto',
        data: user,
      };
      
      //throw new NotFoundException('Usuario no encontrado');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: user,
    };
  }

  //Actualizar registros-------------------------------------------------------------------
  async editRecord(id: number, update: UpdateSistemaNombresRegDto) {
    const found = await this.NombresRegRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    if (update.passnreg) {
      const saltOrRounds = 12;
      update.passnreg = await bcrypt.hash(update.passnreg, saltOrRounds);
    }

    await this.NombresRegRepo.update(id, update);

    const modified = await this.NombresRegRepo.findOne({
      where: { id: id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: modified,
    };
  }

  //Eliminar registros--------------------------------------------------------------------
  async remove(id: number) {
    const found = await this.NombresRegRepo.findOneBy({ id: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.NombresRegRepo.remove(found),
    };
  }
}
