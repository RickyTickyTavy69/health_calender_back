import { Body, Controller, Delete, Get, Param, Post, Res, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUser } from "../users/user.types";
import { LoginDto } from "../dto/login.dto";
import { JwtAuthGuard } from "./guards/auth.guard";

@ApiTags("Auth Controller")
@Controller('auth')
export class AuthController {

  constructor(private readonly authService : AuthService) {
  }

  @ApiOperation({summary: "login a user"})
  @ApiResponse({status: 200, type: IUser})
  @Post("login")
  async logIn(@Body() body: LoginDto, @Res() res: Response) {

    console.log("logging in", body);

    const data = await this.authService.logIn(body);
    if(data.error){
      res.status(500).json({message: "user unauthorized"});
    } else {
      const {user, refreshToken, accessToken} = data;
      // вот тут найти ошибку.
      console.log("sending responses to client...")
      res.cookie("refreshToken", refreshToken, {httpOnly: true});
      res.status(200).json({message: "user was logged in", user, accessToken});
    }

  }

  @ApiOperation({summary: "logOut a user"})
  @ApiResponse({status: 200})
  @Post("logout")
  async logOut( @Req() req : Request, @Res() res: Response) {
    const result = await this.authService.logOut(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
  }

}

//const { user, refreshToken, accessToken }
