import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { PriorityTaskEnum } from "src/common/enums/priority-task.enum";

export class CreateTaskDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
    
    /*@IsOptional()
    @IsNumber()
    @Min(1)
    user_id: number;*/

    @ApiProperty()
    @IsOptional()
    @IsEnum(PriorityTaskEnum)
    priority: PriorityTaskEnum;
}