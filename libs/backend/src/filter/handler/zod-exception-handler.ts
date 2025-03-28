import { HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionHandler } from './abstract-error-handler';
import { ResponseEntity } from '../../base/response-entity';
import { SERVER_ERROR_CODE } from '../../constant/server-error-code';
import { ZodError } from 'zod';

@Injectable()
export class ZodExceptionHandler implements ExceptionHandler {
  canHandle(exception: Error): boolean {
    return exception instanceof ZodError;
  }

  getErrorResponse(exception: ZodError): ResponseEntity<undefined> {
    const message = exception.issues
      .map((issue) => {
        const path = issue.path.length ? issue.path.join('.') : 'root';
        return `${path}: ${issue.message}`;
      })
      .join(' | ');

    return ResponseEntity.error(
      SERVER_ERROR_CODE.VALIDATION_SERVER_ERROR,
      message,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
