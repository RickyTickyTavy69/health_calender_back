import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { RoleDto } from "../dto/role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role)  {
  }

  async createRole(body: RoleDto){
    const role = await this.roleRepository.create(body);
    return role;
  }

  async getRole(value: string){
    const role = await this.roleRepository.findOne({where : {value}});
    return role;
  }

}
