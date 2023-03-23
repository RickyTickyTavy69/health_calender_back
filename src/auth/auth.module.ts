import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from "./token.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { JwtAuthStrategy } from "./guards/auth.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtAuthStrategy],
  imports: [
    SequelizeModule.forFeature([User])
  ]
})
export class AuthModule {}
