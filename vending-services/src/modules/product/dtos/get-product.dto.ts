import { IsOptional, IsString } from 'class-validator';

export class GetProductQueryParamDto {
    @IsString()
    @IsOptional()
    id: string;
}
