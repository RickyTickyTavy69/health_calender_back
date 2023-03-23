import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../users/user.model";

@Injectable()
export class MailService {
  constructor(private mailerService : MailerService) {}


  async sendMail(user: User, token: string){
      const url = `http://localhost:6660/users/verifyUser/${token}`
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'thou art welcome to our application!',
        template: "./transactional",
        context: {
          name: user.username,
          url,
        }
      })
      console.log("mail has been sent")
      return {msg: `mail successfully sent to ${user.username}`}
    }catch(e){
        console.log("error with sending email", e);
        return {error: e}
    }

  }
}
