import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '../config/config.types';
import { UserPersistence } from '../user/infrastructure/persistence/user.persistence';

@Injectable()
export class TypeormUserDbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.DB_TYPE', { infer: true }),
      host: this.configService.get('database.DB_HOST', { infer: true }),
      port: this.configService.get('database.DB_PORT', { infer: true }),
      username: this.configService.get('database.DB_USERNAME', { infer: true }),
      password: this.configService.get('database.DB_PASSWORD', { infer: true }),
      name: this.configService.get('database.DB_NAME', { infer: true }),
      database: this.configService.get('database.DB_NAME', { infer: true }),
      synchronize: this.configService.get('database.DB_SYNCHRONIZE', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      // logging:
      //   this.configService.get('app.NODE_ENV', { infer: true }) !==
      //   'production',
      entities: [UserPersistence],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        connectionLimit: this.configService.get('database.DB_MAX_CONNECTIONS', {
          infer: true,
        }),
        //   ssl: this.configService.get('database.DB_SSL_ENABLED', { infer: true })
        //     ? {
        //         rejectUnauthorized: this.configService.get(
        //           'database.DB_REJECT_UNAUTHORIZED',
        //           { infer: true },
        //         ),
        //         ca:
        //           this.configService.get('database.DB_CA', { infer: true }) ??
        //           undefined,
        //         key:
        //           this.configService.get('database.DB_KEY', { infer: true }) ??
        //           undefined,
        //         cert:
        //           this.configService.get('database.DB_CERT', { infer: true }) ??
        //           undefined,
        //       }
        //     : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
