import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import {join} from "path";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  providers: [MailService],
  imports: [MailerModule.forRoot({
    transport: {
      host: "smtp.gmail.com",
      auth: {
        user: "bakirovartem69@gmail.com",
        pass: "uylinfmrboqchzcl",
      },
    },
    defaults: {
      from: '"your health app" <bakirovartem69@gmail.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
    }
  })],
  exports: [MailService]
})
export class MailModule {}
