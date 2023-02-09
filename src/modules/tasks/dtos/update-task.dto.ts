import { PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { PriorityTaskEnum } from "./../../../common/enums/priority-task.enum";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}