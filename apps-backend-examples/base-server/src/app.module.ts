import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BaseServerExceptionModule } from './exception/base-server-exception.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@BE-common/pipe/zod-validation-pipe';
import { AllExceptionFilter } from '@BE-common/filter/all-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormUserDbConfigService } from './database/typeorm-user-db-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';

const dataSourceFactory = async (options?: DataSourceOptions) => {
  if (!options) {
    throw new Error('DataSourceOptions is required');
  }
  return new DataSource(options).initialize();
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: [`${process.env.NODE_ENV ?? ''}.env`],
    }),
    UserModule,
    BaseServerExceptionModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormUserDbConfigService,
      dataSourceFactory: dataSourceFactory,
    }),
  ],
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
