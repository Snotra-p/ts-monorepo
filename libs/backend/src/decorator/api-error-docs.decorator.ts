import { ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ErrorOutDto } from '../base/error-out.dto';
import { ErrorMap } from '../exception/abstract-server-exception';

export const ApiErrorDocs = (errorKeys: string[], serverErrorMap: ErrorMap<string>): MethodDecorator => {
  return applyDecorators(
    ...errorKeys.map((errorKey) =>
      ApiResponse({
        status: serverErrorMap[errorKey].statusCode,
        description:
          'code : ' + serverErrorMap[errorKey].errorCode + ' message : ' + serverErrorMap[errorKey].message,
        type: ErrorOutDto
      })
    )
  );
};
