import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UsersService } from "./users.service"
import {Response} from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUser } from "./user.types";
import { User } from "./user.model";
import { JwtAuthGuard } from "../auth/guards/auth.guard";

@ApiTags("Users Controller")
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @ApiOperation({summary: "Creating new user"})
  @ApiResponse({status: 200, type: IUser})
  @Post("create")
  async createUser(@Body() body: UserDto, @Res() res: Response) {
    console.log("got user info", body);
    const { user, refreshToken, accessToken } = await this.userService.createUser(body);
    console.log("returning user...");
    res.cookie("refreshToken", refreshToken, {httpOnly: true});
    res.status(200).json({message: "user was created", user, accessToken});
  }

  @ApiOperation({summary: "updating user Period utils"})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Post("updatePeriodData")
  async updatePeriodData(@Body() body) {
    console.log("updating period data...", body)
    const result = await this.userService.updatePeriodData(body)
    return result;
  }

  @ApiOperation({summary: "getting a user, when logged In"})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Post("getUser")
  async getUser(@Body() body) {
    console.log("getting a user...", body)
    const user = await this.userService.getUser(body.username);
    return {msg: "user found", user};
  }

}
