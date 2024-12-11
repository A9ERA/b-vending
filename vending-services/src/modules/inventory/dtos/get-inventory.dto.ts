import { IsOptional, IsString } from 'class-validator';

export class GetInventoryQueryParamDto {
    @IsString()
    @IsOptional()
    categoryId: string;
}
