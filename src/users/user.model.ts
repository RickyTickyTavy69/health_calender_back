import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UsersModule } from "./users.module";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string,
  password: string,
  username: string,
  salt: string,
  refreshToken: string | null,
  verified: boolean,
  role: "user" | "premium",
  verificationString: string,
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{

  @ApiProperty({example: new Date(), description: "time, when a user was created"})
  @Column({type: DataType.INTEGER})
  createdAt: Date

  @ApiProperty({example: new Date(), description: "time, when a user was updated"})
  @Column({type: DataType.INTEGER})
  updatedAt: Date

  @ApiProperty({example: "666", description: "unique user id"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: "Marina", description: "user unique name"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  username: string;

  @ApiProperty({example: "Marina.E@gmail.com", description: "user email"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: "**********", description: "user password"})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: "9dsfsßdfs.sdffu897sd.sdfs90", description: "user refresh token"})
  @Column({type: DataType.STRING, allowNull: false})
  refreshToken: string;

  @ApiProperty({example: "aslödfgheu390", description: "a string, is used for creating a verification link"})
  @Column({type: DataType.STRING, allowNull: false})
  verificationString: string;

  @ApiProperty({example: true, description: "shows if a user is verified or not"})
  @Column({type: DataType.BOOLEAN, allowNull: false})
  verified: boolean;

  @ApiProperty({example: "premium", description: "user role"})
  @Column({type: DataType.STRING, allowNull: false})
  role:  Role;

  @ApiProperty({example: "98dsf7sg9.sdfs8d97.dfsd87", description: "salt, to hash password"})
  @Column({type: DataType.STRING})
  salt: string;

  @ApiProperty({example: {
    lastPeriodBegin: "06.03.2023",
  periodDuration: "6",
  menstruationDuration: "5",
    }, description: "user period utils"})
  @Column({type: DataType.JSON, allowNull: true})
  periodData : {
    lastPeriodBegin: Date,
    periodDuration: string,
    menstruationDuration: string,
  }

  // if two tables (Users and Roles) belong to each other like many to many, we can create another third table
  // (UserRoles) and in this case we must use the @BelongsToMany decorator from sequelize
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}