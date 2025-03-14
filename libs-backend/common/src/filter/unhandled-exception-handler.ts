import { Injectable } from '@nestjs/common';
import { ExceptionHandler } from './abstract-error-handler';
import { ResponseEntity } from '../base/response-entity';
import { SERVER_ERROR_CODE } from '../constant/server-error-code';

@Injectable()
export class UnhandledExceptionHandler implements ExceptionHandler {
  canHandle(_exception: Error): boolean {
    return true;
  }

  getErrorResponse(exception: Error): ResponseEntity<undefined> {
    return ResponseEntity.error(SERVER_ERROR_CODE.UNKNOWN_ERROR_CODE, exception.message);
  }
}
