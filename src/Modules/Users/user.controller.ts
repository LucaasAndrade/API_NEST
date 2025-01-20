import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUIserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUIserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) params) {
    if (!params) throw new Error('id is required');
    return this.userService.findOne(params);
  }

  @Put(':id')
  async update(
    @Body() { email, name, password, birthAt }: UpdatePutUIserDTO,
    @Param('id', ParseIntPipe) params,
  ) {
    if (!birthAt) birthAt = '';

    return this.userService.update(params, { email, name, password, birthAt });
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password, birthAt }: UpdatePatchUIserDTO,
    @Param('id', ParseIntPipe) params,
  ) {
    return this.userService.updatePartial(params, {
      email,
      name,
      password,
      birthAt,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) params) {
    return {
      method: 'delete',
      params,
    };
  }
}
