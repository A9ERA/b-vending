import { IsOptional, IsString } from 'class-validator';

export class GetCashQueryParamDto {
    @IsString()
    @IsOptional()
    id: string;
}
