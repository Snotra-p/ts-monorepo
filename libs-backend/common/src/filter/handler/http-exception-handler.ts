import { HttpException, Injectable } from '@nestjs/common';
import { ExceptionHandler } from './abstract-error-handler';
import { ResponseEntity } from '../../base/response-entity';
import { SERVER_ERROR_CODE } from '../../constant/server-error-code';

@Injectable()
export class HttpExceptionHandler implements ExceptionHandler {
  canHandle(exception: Error): boolean {
    return exception instanceof HttpException;
  }

  getErrorResponse(exception: HttpException): ResponseEntity<undefined> {
    const response = exception.getResponse();
    const responseMessage = typeof response === 'string' ? response : JSON.stringify(response);

    return ResponseEntity.error(SERVER_ERROR_CODE.NORMAL_HTTP, responseMessage, exception.getStatus());
  }
}
