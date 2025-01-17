import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUIserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUIserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    email,
    name,
    password,
    birthAt,
  }: CreateUserDTO): Promise<any> {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        birthAt,
      },
    });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt }: UpdatePutUIserDTO,
  ) {
    this.exists(id);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password,
        birthAt: !birthAt ? null : new Date(birthAt),
      },
    });
  }

  async updatePartial(
    id: number,
    { birthAt, email, name, password }: UpdatePatchUIserDTO,
  ) {
    this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) data.password = password;

    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    this.exists(id);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (!(await this.findOne(id)))
      throw new NotFoundException('User not found');
  }
}
