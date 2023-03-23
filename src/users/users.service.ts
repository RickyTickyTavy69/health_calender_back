import { Body, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { UserDto } from "../dto/user.dto";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { TokenService } from "../auth/token.service";
import { RolesService } from "../roles/roles.service";
import { CycleCounter } from "../utils/CycleCounter";
import { MailService } from "../mail/mail.service";
import {v4 as uuidV4} from "uuid"

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private roleService: RolesService,
    private readonly tokenservice: TokenService,
    private readonly cycleCounter : CycleCounter,
    private readonly mailService: MailService,
  ) {}

  async createUser(body: UserDto){
      const {password} = body;
      const salt = await bcrypt.genSalt();
      console.log("salt", salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      const payload = {
        username: body.username,
      }
      const { accessToken, refreshToken } = this.tokenservice.createTokens(payload);
      console.log("tokens", accessToken, refreshToken);
      console.log("password hash", hashedPassword);
      const verifyToken = uuidV4();
      const user = await this.userRepository.create({...body, password: hashedPassword, salt, refreshToken, verificationString: verifyToken, verified: false, role: "user"});
      console.log("sending mail to user... ", body.username);
      await this.mailService.sendMail(user, verifyToken);
      const role = await this.roleService.getRole("user");
      await user.$set("roles", [role.id]);
      await user.save();
      return {user, refreshToken, accessToken};
  }

  async updatePeriodData(body) {
      const {firstDay, periodDuration, cycleDuration, username} = body;
      const result = await this.userRepository.update({periodData: {
        lastPeriodBegin: firstDay,
          periodDuration: cycleDuration,
          menstruationDuration: periodDuration,
      }}, {where: {username: username}});
      const calenderData = await this.cycleCounter.countCycles(body);
      return result;
  }

  async getUser(username: string) {
    const user = await this.userRepository.findOne({where: {username}});
    return user;
  }
}
