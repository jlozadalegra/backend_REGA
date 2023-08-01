import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { SistemaUnidadReg } from "src/sistema-unidad-reg";

export class UnitDto {
    @ApiProperty()
    @IsString()
    Num_unidad_reg: SistemaUnidadReg;
}