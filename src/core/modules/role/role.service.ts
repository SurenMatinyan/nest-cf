import { ROLE_REPOSITORY } from '@constant';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
}
