import { ErrorValidate } from "../interfaces/";
import { ResponseDto } from "./response.dto";

interface Pagination<T> {
    data: T[];
    page: number;
    limit: number;
    totalCount: number;
}

export class ResponsePaginationDto<T> implements ResponseDto {
    success: boolean;
    message: string;
    errors_validate?: ErrorValidate[];
    payload: Pagination<T>;

}