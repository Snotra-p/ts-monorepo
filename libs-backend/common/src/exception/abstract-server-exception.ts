import { HttpException, HttpStatus } from "@nestjs/common";

export type ErrorMap<T extends string> = Record<
  T,
  {
    code: number;
    message: string;
    httpStatus: HttpStatus;
  }
>;

export abstract class AbstractServerException<
  K extends string,
> extends HttpException {
  readonly code: number;

  protected constructor(errorKey: K, errorMap: ErrorMap<K>, message?: string) {
    const errorData = errorMap[errorKey];
    super(message ?? errorData.message, errorData.httpStatus);
    this.code = errorData.code;
  }
}
