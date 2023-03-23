import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { TokenService } from "../auth/token.service";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesService } from "../roles/roles.service";
import { RolesModule } from "../roles/roles.module";
import { JwtAuthStrategy } from "./guards/auth.strategy";
import { CycleCounter } from "../utils/CycleCounter";
import { MailModule } from "../mail/mail.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, TokenService, JwtAuthStrategy, CycleCounter],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    MailModule,
  ]
})
export class UsersModule {

}
