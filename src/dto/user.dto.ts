import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto{

    @ApiProperty({example: "Marina", description: "User unique username"})
    @IsString()
    @MinLength(4)
    username: string;

    @ApiProperty({example: "Marina.E@mail.ru", description: "user email"})
    @MinLength(4)
    @IsEmail()
    email: string;

    @ApiProperty({example: "***********", description: "User Password"})
    @IsString()
    @MinLength(4)
    password: string;

    @ApiProperty({example: "sd98rusd.sdfuze98.sdfue897", description: "salt, to hash password"})
    @IsString()
    salt: string;

    @ApiProperty({example: {
            lastPeriodBegin: "06.03.2023",
            periodDuration: "6",
            menstruationDuration: "5",
        }, description: "User Password"})
    periodData? : {
        lastPeriodBegin: string,
        periodDuration: string,
        menstruationDuration: string,
    }
}