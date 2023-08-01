import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { SistemaUnidadReg } from 'src/sistema-unidad-reg';
import { CreateSistemaRegDto } from './dto/create-sistema-reg.dto';
import { UpdateSistemaRegDto } from './dto/update-sistema-reg.dto';
import { SistemaReg } from './entities/sistema-reg.entity';

@Injectable()
export class SistemaRegService {
  private SistemaRegRepo = AppDataSource.getRepository(SistemaReg);

  //-------------------------------------------------------------------------------------
  async _get() {
    const id = 7;
    const result = await this.SistemaRegRepo.createQueryBuilder('rega')
      .select('rega.ent_sal', 'ent_sal')
      .addSelect('rega.num_reg', 'num_reg')
      .addSelect('rega.aclar_adic', 'aclar_adic')
      .addSelect('rega.fecha', 'fecha')
      .addSelect('rega.denomindoc', 'denomindoc')
      .addSelect('rega.numejemp', 'numejemp')
      .addSelect('rega.year', 'year')
      .addSelect('rega.repartir', 'repartir')
      .addSelect('rega.Co_nombre', 'Co_nombre')
      .addSelect('rega.Num_unidad_reg', 'Num_unidad_reg')
      .addSelect('rega.Co_tdoc', 'Co_tdoc')
      .addSelect('rega.Co_pdest', 'Co_pdest')
      .addSelect('rega.Co_tipsal', 'Co_tipsal')
      .orderBy('Num_unidad_reg', 'ASC')
      .orderBy('fecha', 'ASC')
      .where('Num_unidad_reg = ' + id)
      .getRawMany();

    //const {Co_reg, ...value} = result;
    return result;
  }

  //---------------------------------------------------------------------------------------
  async _post(rows: any) {
    const resul = await this.SistemaRegRepo.save(rows);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: resul,
    };
  }

  //Insertar registros---------------------------------------------------------------------
  async create(createSistemaRegDto: CreateSistemaRegDto) {
    //num_reg
    const NumUnidad = createSistemaRegDto.Num_unidad_reg;
    const year = createSistemaRegDto.year;
    //const repartir = createSistemaRegDto.repartir;

    //const numreg = await this.consecutivo(NumUnidad, year);

    const registro = await this.SistemaRegRepo.create(createSistemaRegDto);
    //registro.num_reg = numreg;

    const resul = await this.SistemaRegRepo.save(registro);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: resul,
    };
  }

  //Obtener todos los registros------------------------------------------------------------
  async findAll() {
    const found = await this.SistemaRegRepo.find({
      relations: {
        Co_nombre: true,
        Co_tdoc: true,
        Co_pdest: true,
        Co_tipsal: true,
        Num_unidad_reg: true,
      },
      order: {
        Co_reg: 'DESC',
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

  //Obtener todos los registros de una unidad----------------------------------------------
  async findAllNumUnidad(num: string) {
    const found = await this.SistemaRegRepo.find({
      relations: {
        Co_nombre: true,
        Co_tdoc: true,
        Co_pdest: true,
        Co_tipsal: true,
        Num_unidad_reg: true,
      },
      where: { Num_unidad_reg: { id: num as any } },
      order: {
        Co_reg: 'DESC',
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

  //Función para Obtener el consecutivo del REGA--------------------------------------------
  async consecutivo(NumUnidad: SistemaUnidadReg, year: string) {
    const maxi = await this.SistemaRegRepo.createQueryBuilder('reg')
      .select('MAX(reg.num_reg)', 'max')
      .where('reg.Num_unidad_reg = :NumUnidad', { NumUnidad })
      .andWhere('reg.year = :year', { year })
      .getRawOne();

    return maxi.max + 1;
  } //Fin

  //Buscar un único registro en la tabla por el campo Co_reg-------------------------------
  async findOne(id: number) {
    const found = await this.SistemaRegRepo.findOne({
      where: { Co_reg: id },
      relations: {
        Co_nombre: true,
        Co_tdoc: true,
        Co_pdest: true,
        Co_tipsal: true,
        Num_unidad_reg: true,
      },
    });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: found,
    };
  }

  //Actualizar registros-------------------------------------------------------------------
  async editRecord(id: number, update: UpdateSistemaRegDto) {
    const found = await this.SistemaRegRepo.findOneBy({ Co_reg: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    console.log('Rorber', update);

    await this.SistemaRegRepo.update(id, update);

    const modified = await this.SistemaRegRepo.findOne({
      where: { Co_reg: id },
      relations: {
        Co_nombre: true,
        Co_tdoc: true,
        Co_pdest: true,
        Co_tipsal: true,
        Num_unidad_reg: true,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: modified,
    };
  }

  //Eliminar registros--------------------------------------------------------------------
  async remove(id: number) {
    const found = await this.SistemaRegRepo.findOneBy({ Co_reg: id });

    if (found == null)
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: await this.SistemaRegRepo.remove(found),
    };
  }
}
