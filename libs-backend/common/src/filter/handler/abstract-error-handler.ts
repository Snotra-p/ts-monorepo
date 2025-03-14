import { ResponseEntity } from '../../base/response-entity';

export const ErrorHandlers = Symbol('ErrorHandlers');

export abstract class ExceptionHandler {
  abstract canHandle(exception: unknown): boolean;
  abstract getErrorResponse(exception: unknown): ResponseEntity<unknown>;
}
