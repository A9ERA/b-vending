import { IsOptional, IsString } from 'class-validator';

export class GetMediaQueryParamDto {
    @IsString()
    @IsOptional()
    id: string;
}
