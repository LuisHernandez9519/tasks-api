import { IsNumber, IsOptional, IsPositive, Min, min } from "class-validator";

export class QueryParamDto {
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    search?: string;
    constructor(){
        this.limit = 10
        this.page = 1
    }
}