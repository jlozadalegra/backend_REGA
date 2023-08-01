import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|dot)$/)) {
          return cb(new Error('Formato de archivo invalido'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: `Archivo ${file.originalname} subido exitosamente`,
      data: file.originalname,
    };
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), './uploads/' + filename)));
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename): StreamableFile {
    const file = createReadStream(join(process.cwd(), './uploads/' + filename));
    console.log('file', file);
    return new StreamableFile(file);
  }
}
