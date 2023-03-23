import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./roles.model";
import { RoleDto } from "../dto/role.dto";
import { RolesService } from "./roles.service";

@ApiTags("roles controller")
@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {
    }

    @ApiResponse({status: 200})
    @ApiOperation({summary: "adding a role for a user"})
    @Post("create")
    async createRole(@Body() body: RoleDto){
        const role = await this.rolesService.createRole(body);
        return role;
    }

    @ApiResponse({status: 200, type: Role})
    @ApiOperation({summary: "adding a role for a user"})
    @Get("getRole/:value")
    async getRole(@Param('value') value: string){
        const role = await this.rolesService.getRole(value);
        return role;
    }
}
