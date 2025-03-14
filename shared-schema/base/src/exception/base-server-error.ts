import { ValueOf } from "@BE-common/types";

import { HttpStatus } from "@nestjs/common";
import { ErrorMap } from "@BE-common/exception/abstract-server-exception";
import { SERVER_ERROR_CODE } from "@BE-common/constant/server-error-code";

export const BASE_SERVER_ERROR_KEY = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type BaseServerErrorKey = ValueOf<typeof BASE_SERVER_ERROR_KEY>;

export const BASE_SERVER_ERROR: ErrorMap<BaseServerErrorKey> = {
  [BASE_SERVER_ERROR_KEY.SESSION_EXPIRED]: {
    errorCode: 1000,
    message: "세션이 만료되었습니다.",
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [BASE_SERVER_ERROR_KEY.USER_NOT_FOUND]: {
    errorCode: 1001,
    message: "유저를 찾을 수 없습니다.",
    statusCode: HttpStatus.NOT_FOUND,
  },
  [BASE_SERVER_ERROR_KEY.UNKNOWN_ERROR]: {
    errorCode: SERVER_ERROR_CODE.UNKNOWN_ERROR_CODE,
    message: "CRITICAL_UNKNOWN_ERROR",
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

export type BaseServerErrorCode =
  (typeof BASE_SERVER_ERROR)[keyof typeof BASE_SERVER_ERROR]["errorCode"];
