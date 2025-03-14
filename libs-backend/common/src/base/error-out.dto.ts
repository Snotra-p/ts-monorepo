import { ApiProperty } from '@nestjs/swagger';

export class ErrorOutDto {
  @ApiProperty() readonly errorCode: number;
  @ApiProperty() readonly message: string;

  constructor(errorCode: number, message: string) {
    this.errorCode = errorCode;
    this.message = message;
  }
}
