import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateSubTaskDto } from "./create-subtask.dto";

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto){}