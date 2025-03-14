import { Injectable } from '@nestjs/common';
import { ExceptionHandler } from '@BE-common/filter/abstract-error-handler';
import { ResponseEntity } from '@BE-common/base/response-entity';
import { BaseServerException } from '@schema/exception/base-server-exception';

@Injectable()
export class BaseServerExceptionHandler implements ExceptionHandler {
  canHandle(exception: Error): boolean {
    return exception instanceof BaseServerException;
  }

  getErrorResponse(exception: BaseServerException): ResponseEntity<undefined> {
    return ResponseEntity.error(
      exception.errorCode,
      exception.message,
      exception.statusCode,
    );
  }
}
