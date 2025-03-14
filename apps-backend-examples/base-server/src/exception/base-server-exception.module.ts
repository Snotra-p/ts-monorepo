import { Module } from '@nestjs/common';
import { BaseServerExceptionHandler } from './base-server-exception-handler';
import { HttpExceptionHandler } from '@BE-common/filter/handler/http-exception-handler';
import {
  ErrorHandlers,
  ExceptionHandler,
} from '@BE-common/filter/handler/abstract-error-handler';
import { UnhandledExceptionHandler } from '@BE-common/filter/handler/unhandled-exception-handler';

const errorHandlers = [
  BaseServerExceptionHandler,
  HttpExceptionHandler,
  UnhandledExceptionHandler,
];

@Module({
  providers: [
    ...errorHandlers,
    {
      inject: errorHandlers,
      provide: ErrorHandlers,
      useFactory: (...errorHandlers: ExceptionHandler[]) => errorHandlers,
    },
  ],
  exports: [ErrorHandlers],
})
export class BaseServerExceptionModule {}
