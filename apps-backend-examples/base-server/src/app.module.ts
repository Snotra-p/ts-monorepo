import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@BE-common/pipe/zod-validation-pipe';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
