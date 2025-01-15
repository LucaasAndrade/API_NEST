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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUIserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUIserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) params) {
    return { user: {}, params };
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdatePutUIserDTO,
    @Param('id', ParseIntPipe) params,
  ) {
    return {
      method: 'put',
      email,
      name,
      password,
      params,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUIserDTO,
    @Param('id', ParseIntPipe) params,
  ) {
    return {
      method: 'patch',
      email,
      name,
      password,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) params) {
    return {
      method: 'delete',
      params,
    };
  }
}
