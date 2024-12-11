import { IsOptional, IsString } from 'class-validator';

export class GetProductDetailsQueryParamDto {
    @IsString()
    @IsOptional()
    categoryId: string;
}
