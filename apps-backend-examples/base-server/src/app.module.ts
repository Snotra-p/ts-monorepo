import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BaseServerExceptionModule } from './exception/base-server-exception.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@BE-common/pipe/zod-validation-pipe';
import { AllExceptionFilter } from '@BE-common/filter/all-exception.filter';

@Module({
  imports: [UserModule, BaseServerExceptionModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
