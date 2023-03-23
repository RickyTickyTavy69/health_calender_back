import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { Ipayload } from "./user.types";

@Injectable()
export class TokenService {
  createTokens(payload: Ipayload){
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '24h'});

    return{
      accessToken,
      refreshToken,
    }
  }
}