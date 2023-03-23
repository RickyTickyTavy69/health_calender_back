import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginDto{

  @ApiProperty({example: "Artem", description: "name of the user"})
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({example: "password", description: "password of the user"})
  @IsString()
  password: string;
}