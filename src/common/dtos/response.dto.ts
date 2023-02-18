import { ErrorValidate } from '../interfaces';

export interface ResponseDto {
  success: boolean;
  message: string;
  errors_validate?: ErrorValidate[];
  payload: any;
}
