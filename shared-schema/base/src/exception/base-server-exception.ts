import { AbstractServerException } from "@BE-common/exception/abstract-server-exception";
import { BASE_SERVER_ERROR, BaseServerErrorKey } from "./base-server-error";

export class BaseServerException extends AbstractServerException<BaseServerErrorKey> {
  constructor(
    errorKey: BaseServerErrorKey,
    message?: string,
    ignoreLogging?: boolean,
  ) {
    super(errorKey, BASE_SERVER_ERROR, message, ignoreLogging);
  }
}
