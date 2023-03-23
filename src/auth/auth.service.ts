import { Body, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "./token.service";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";

import {User} from "../users/user.model";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService
  ) {

  }

  async logIn(body: LoginDto) {
    const {password, username} = body;
    const user = await this.userRepository.findOne({where: {username: username}, include: {all: true} });
    console.log("user is", user);
    console.log("checking passwords", user.password, password);
    const isEqual = await bcrypt.compare(password, user.password);

    if(!isEqual){
      console.log("passwords not equal")
      return {error : "passwords are not equal"}
    } else {
      const payload = {
        username: body.username,
      }
      const { accessToken, refreshToken } = this.tokenService.createTokens(payload);
      console.log("created tokens...")
      return {user, refreshToken, accessToken};
    }

  }

  async logOut(refreshToken: string) {
    const user = await this.userRepository.findOne({where: {refreshToken}});
    user.setDataValue("refreshToken", null);
    await user.save();
  }

}
