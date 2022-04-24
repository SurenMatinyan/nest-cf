import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
export default function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Crossforce')
    .setDescription('The crossforce API description')
    .setVersion('1.0')
    .addTag('crossforce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
}
