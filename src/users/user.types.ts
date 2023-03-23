//types are returned from api

import { ApiProperty } from "@nestjs/swagger";

export class IUser{
  @ApiProperty({example: "user created", description: "message describing action is done"})
  message: string;

  @ApiProperty({example: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "666",
      username: "Marina",
      email: "Marina.E@gmail.com",
      password: "********",
      refreshToken: "23kl4j23kh23.23lk59329032hf.2sdfkljhk2390",
      verified: "true",
      role: "premium",
      salt: "98f7sd9087.sdfklsd89f7sd.sdfklsd89f69",
      periodData : {
        lastPeriodBegin: "06.03.2023",
        periodDuration: "6",
        menstruationDuration: "5",
      }
    }, description: "User object"})
  user: {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    username: string;
    email: string;
    password: string;
    refreshToken: string;
    verified: boolean;
    role: "user" | "premium";
    salt: string;
    periodData : {
      lastPeriodBegin: string;
      periodDuration: string;
      menstruationDuration: string;
    }
  };
  @ApiProperty({example: "lsdk7907sd.s98fsdk.sdfs979sd", description: "User Access Token"})
  accessToken: string;
}

export interface Ipayload{
  username: string,
}

