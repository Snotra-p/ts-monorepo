import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorOutDto } from './error-out.dto';
import { PaginationOutDto } from './pagination-out.dto';

export class ResponseEntity<T> {
  @ApiProperty() readonly code: HttpStatus;
  @ApiProperty() readonly success: boolean;
  @ApiPropertyOptional() readonly data?: T;
  @ApiPropertyOptional() readonly error?: ErrorOutDto;
  @ApiPropertyOptional() readonly pagination?: PaginationOutDto;

  constructor(options: { code?: HttpStatus; data?: T; error?: ErrorOutDto; pagination?: PaginationOutDto }) {
    this.code = options.code || HttpStatus.OK;
    this.success = !options.error && this.code < HttpStatus.CONTENT_DIFFERENT;
    this.data = options.data;
    this.error = options.error;
    this.pagination = options.pagination;
  }

  static ok<T>(data?: T, pagination?: PaginationOutDto): ResponseEntity<T> {
    return new ResponseEntity<T>({
      code: HttpStatus.OK,
      data,
      pagination
    });
  }

  static error(
    errorCode: number,
    message: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ): ResponseEntity<undefined> {
    return new ResponseEntity<undefined>({
      code: httpStatus,
      error: new ErrorOutDto(errorCode, message)
    });
  }
}

// 0. success 유무 /1. code(httpCode) 2. data 3. error info(에러코드, 에러메시지)
// export class ResponseEntity<S> {
//   @ApiProperty() private readonly code?: HttpStatus;
//   @ApiPropertyOptional() private readonly success?: boolean;
//   @ApiPropertyOptional() private readonly data?: S;
//   @ApiPropertyOptional() private readonly error?: ErrorInfo;
//   @ApiPropertyOptional() private readonly pagination?: unknown;
//
//   constructor(code?: HttpStatus, data?: S, error?: ErrorInfo) {
//     this.code = code;
//     this.data = data;
//     this.error = error;
//   }
//
//   static ok<T>(data?: T): ResponseEntity<T> {
//     return new ResponseEntity<T>(HttpStatus.OK, data ?? undefined);
//   }
//
//   static error(errorKey: ServerErrorKey): ResponseEntity<undefined> {
//     return new ResponseEntity<undefined>(
//       ServerErrors[errorKey].httpStatus,
//       undefined,
//       new ServerError(
//         ServerErrors[errorKey].code,
//         ServerErrors[errorKey].message,
//       ),
//     );
//   }
// }
