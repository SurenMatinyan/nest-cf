import { NETWOR_MEMBER_REPOSITORY } from '@constant';
import { IUser, IResponse, IResponseMessage } from '@intrefaces';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@services';
import { Repository } from 'typeorm';
import { NetworkMemberEntity } from './network-member.entity';

@Injectable()
export class NetworkMemberService extends BaseService<NetworkMemberEntity> {
  constructor(
    @Inject(NETWOR_MEMBER_REPOSITORY)
    private readonly networkMemberRepository: Repository<NetworkMemberEntity>,
  ) {
    super(networkMemberRepository);
  }
  findAll(user: IUser, ...[]: any): Promise<IResponse<NetworkMemberEntity[]>> {
    throw new Error('Method not implemented.');
  }
  findOne(user: IUser, ...[]: any): Promise<IResponse<NetworkMemberEntity>> {
    throw new Error('Method not implemented.');
  }
  delete(user: IUser, ...[]: any): Promise<IResponseMessage> {
    throw new Error('Method not implemented.');
  }
  update(user: IUser, ...[]: any): Promise<IResponseMessage> {
    throw new Error('Method not implemented.');
  }
  create(user: IUser, ...[]: any): Promise<IResponseMessage> {
    throw new Error('Method not implemented.');
  }
}
