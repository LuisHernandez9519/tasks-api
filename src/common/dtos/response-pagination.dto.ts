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
    errors_validate?: Record<string, any>[];
    payload: Pagination<T>;

}