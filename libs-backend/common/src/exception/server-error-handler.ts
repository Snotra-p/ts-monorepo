import { HttpException, Injectable, Logger } from "@nestjs/common";
import { AbstractServerException } from "./abstract-server-exception";
import { HttpAdapterHost } from "@nestjs/core";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class ErrorBody {
  @ApiProperty() code!: number;
  @ApiProperty() timestamp!: string;
  @ApiProperty() path!: string;
  @ApiProperty() message: string | undefined;
}

@Injectable()
export class ServerErrorHandler<T extends string> {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  serverExceptionHandle(
    exception: AbstractServerException<T>,
    ctx: HttpArgumentsHost,
  ): void {
    const { httpAdapter } = this.httpAdapterHost;
    const request = ctx.getResponse<Request>();

    const body: ErrorBody = {
      code: exception.code,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };
    httpAdapter.reply(request, body, exception.getStatus());
    Logger.error(exception.stack);
  }

  httpExceptionHandle(exception: HttpException, ctx: HttpArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const httpStatus = exception.getStatus();

    const responseBody: ErrorBody = {
      code: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message || exception.name,
    };

    httpAdapter.reply(ctx.getResponse<Response>(), responseBody, httpStatus);
  }
}
