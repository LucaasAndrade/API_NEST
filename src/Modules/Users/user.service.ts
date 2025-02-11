import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUIserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUIserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<any> {
    data.password = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data,
    });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUIserDTO,
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, 10);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password,
        birthAt: !birthAt ? null : new Date(birthAt),
        role,
      },
    });
  }

  async updatePartial(
    id: number,
    { birthAt, email, name, password, role }: UpdatePatchUIserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) data.password = await bcrypt.hash(password, 10);
    if (role) data.role = role;

    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    )
      throw new NotFoundException('User not found');
  }
}
