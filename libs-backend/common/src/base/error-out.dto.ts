import { ApiProperty } from "@nestjs/swagger";

export class ErrorOutDto {
  @ApiProperty() private readonly errorCode: number;
  @ApiProperty() private readonly message: string;

  constructor(errorCode: number, message: string) {
    this.errorCode = errorCode;
    this.message = message;
  }
}
