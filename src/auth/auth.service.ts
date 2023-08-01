import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { SistemaNombresRegService } from 'src/sistema-nombres-reg';

import { AuthDto } from './dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: SistemaNombresRegService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userService.findOne(authDto.usuario);

    //Si el usuario no existe
    if (!user.data) {
      return user;
      //throw new NotFoundException('Usuario no encontrado');
    }

    //Validar contraseña
    const valid = await bcrypt.compare(authDto.password, user.data.passnreg);
    //si la contraseña es incorrecta
    if (!valid) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Constraseña Incorrecta',
        data: valid,
      };
      //throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = this.generateAccessToken(
      String(user.data.id),
      user.data.datosgenerales,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario Logueado',
      data: {
        idUsuario: user.data.id,
        usuario: user.data.datosgenerales,
        admin: user.data.aut_NC[0],
        idUnidad: user.data.Num_unidad_reg.id,
        keyUnidad: user.data.Num_unidad_reg.Num_unidad_reg,
        unidad: user.data.Num_unidad_reg.descripcionureg,
        accessToken: token.accessToken,
      },
    };
  }

  generateAccessToken(idUsuario: string, usuario: string) {
    const payload: JWTPayload = { idUsuario: idUsuario, usuario: usuario };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
