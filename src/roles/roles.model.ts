import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: "user" | "premium",
  description: string,
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttrs>{


  @ApiProperty({example: "666", description: "unique role id"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: "user", description: "the role a user has"})
  @Column({type: DataType.STRING, allowNull: false})
  value: "user" | "premium";

  @ApiProperty({example: "user with premium rights", description: "user role description"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  description: string;

  // if two tables (Users and Roles) belong to each other like many to many, we can create another third table
  // (UserRoles) and in this case we must use the @BelongsToMany decorator from sequelize

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]

}