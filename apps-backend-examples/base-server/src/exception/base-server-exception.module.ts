import { Module } from '@nestjs/common';
import { BaseServerExceptionHandler } from './base-server-exception-handler';
import { HttpExceptionHandler } from '@BE-common/filter/handler/http-exception-handler';
import {
  ErrorHandlers,
  ExceptionHandler,
} from '@BE-common/filter/handler/abstract-error-handler';
import { UnhandledExceptionHandler } from '@BE-common/filter/handler/unhandled-exception-handler';
import { ZodExceptionHandler } from '@BE-common/filter/handler/zod-exception-handler';

const errorHandlers = [
  ZodExceptionHandler,
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
      useFactory: (...errorHandlers: ExceptionHandler[]): ExceptionHandler[] =>
        errorHandlers,
    },
  ],
  exports: [ErrorHandlers],
})
export class BaseServerExceptionModule {}
