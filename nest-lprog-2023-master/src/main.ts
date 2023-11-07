import { LogInterceptor } from './common/interceptions/log.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// interceptors/pipes
// exceptions
// decorators
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentação da API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(this.app, config);
  SwaggerModule.setup('api', this.app, document);

  await app.listen(3000);
}
bootstrap();


// guards
// jwt/bcrypt
