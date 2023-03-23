import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { Ipayload } from "../user.types";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user.model";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy){

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "lieber stehend sterben, als liegend leben",
    });
  }

  public async validate(payload: Ipayload) {
    console.log("payload", payload);
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username: username }, include: { all: true } });
    return !!user;
  }

}
