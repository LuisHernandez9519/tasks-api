export interface ResponseDto {
    success: boolean;
    message: string,
    errors_validate?: Record<string, any>[];
    payload: any
}