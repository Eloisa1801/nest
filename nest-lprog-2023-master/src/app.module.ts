import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserService } from './service/user.service';
import { UserModule } from './model/user/user.module';
import { PrismaModule } from './database/prisma.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//config swagger
//npm install --save @nestjs/swagger swagger-ui-express

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {
  constructor() {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Documentação da API')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }
}
