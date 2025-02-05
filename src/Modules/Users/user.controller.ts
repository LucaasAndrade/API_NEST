import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUIserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUIserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    if (!id) throw new Error('id is required');
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() { email, name, password, birthAt, role }: UpdatePutUIserDTO,
    @ParamId() id: number,
  ) {
    if (!birthAt) birthAt = '';

    return this.userService.update(id, {
      email,
      name,
      password,
      birthAt,
      role,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password, birthAt, role }: UpdatePatchUIserDTO,
    @ParamId() id: number,
  ) {
    return this.userService.updatePartial(id, {
      email,
      name,
      password,
      birthAt,
      role,
    });
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return {
      method: 'delete',
      id,
    };
  }
}
