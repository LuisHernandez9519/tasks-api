import { ResponseDto } from "./response.dto";
import { ErrorValidate } from "../interfaces/";

export class ResponseSingleDto<T> implements ResponseDto {

    success: boolean;
    message: string;
    errors_validate?: ErrorValidate[];
    payload: T | T[];

}