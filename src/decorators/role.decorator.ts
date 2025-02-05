import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export const rules = (...roles: Role[]) => SetMetadata('roles', roles);
