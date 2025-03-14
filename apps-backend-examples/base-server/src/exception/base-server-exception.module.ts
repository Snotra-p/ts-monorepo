import { Module } from '@nestjs/common';
import { BaseServerExceptionHandler } from './base-server-exception-handler';
import { HttpExceptionHandler } from '@BE-common/filter/http-exception-handler';
import {
  ErrorHandlers,
  ExceptionHandler,
} from '@BE-common/filter/abstract-error-handler';
import { UnhandledExceptionHandler } from '@BE-common/filter/unhandled-exception-handler';

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
