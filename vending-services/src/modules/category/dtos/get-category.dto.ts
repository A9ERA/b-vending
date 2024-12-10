import { IsOptional, IsString } from "class-validator";

export class GetCategoryQueryParamDto {
    @IsString()
    @IsOptional()
    id: string;
}
