import { ArgumentsHost, Catch, ExceptionFilter, Inject, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorHandlers, ExceptionHandler } from './handler/abstract-error-handler';
import { IGNORE_LOGGING_KEY } from '../exception/abstract-server-exception';
import { ErrorOutDto } from '../base/error-out.dto';

type LoggingErrorFormat = ErrorOutDto & {
  statusCode: number;
  session?: unknown;
  request?: unknown;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(ErrorHandlers) private readonly errorHandlers: ExceptionHandler[]
  ) {}

  catch(exception: object, host: ArgumentsHost): void {
    // it is must be exist
    const handler = this.errorHandlers.find((it) => it.canHandle(exception));
    if (!handler) {
      // it never called
      return;
    }

    const responseEntity = handler.getErrorResponse(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    // when production, remove error message
    const body =
      process.env.NODE_ENV === 'prod'
        ? {
            ...responseEntity,
            error: {
              ...responseEntity.error,
              message: undefined
            }
          }
        : responseEntity;

    httpAdapter.reply(ctx.getResponse(), body, responseEntity.code);

    const log: LoggingErrorFormat = {
      ...responseEntity.error,
      statusCode: responseEntity.code
    };

    if (IGNORE_LOGGING_KEY in exception) {
      Logger.debug(log);
      return;
    }

    Logger.error(log);
  }
}
