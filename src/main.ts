import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const PORT = process.env.PORT || 6660;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Health Calender application")
    .setDescription("menstruation cycle and period tracking")
    .setVersion('1.0.0')
    .addTag('RickyTickyTavy')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(PORT, () => {
    console.log("nest app is working on port " + PORT);
  });
}
bootstrap();
