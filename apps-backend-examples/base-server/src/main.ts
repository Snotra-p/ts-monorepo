import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerBuilder = new DocumentBuilder()
    .setTitle('star Server')
    .setDescription('API description')
    .setVersion('1.0');

  const swaggerConfig = swaggerBuilder.build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    } as SwaggerUiOptions | SwaggerCustomOptions,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
