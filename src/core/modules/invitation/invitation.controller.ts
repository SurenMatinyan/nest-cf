import { Roles, User } from '@decorator';
import { IUser } from '@intrefaces';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import * as dto from './invitation.dto';
import { IResponse, IResponseMessage } from '@intrefaces';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesEnum } from '@enum';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @ApiResponse({ type: IResponse })
  @ApiOperation({ summary: 'Create invitation' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Post()
  async create(@User() user: IUser, @Body() dto: dto.CreateInvitationDTO) {
    return this.invitationService.create(user, dto);
  }

  @ApiResponse({ type: IResponse })
  @ApiOperation({ summary: 'Delete invitation' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Delete(':invitationId')
  async delete(
    @User() user: IUser,
    @Param('invitationId') invitationId: string,
  ) {
    return this.invitationService.delete(user, invitationId);
  }

  @ApiResponse({ type: IResponseMessage })
  @ApiOperation({ summary: 'Get invitation by id network' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Get('network/:networkId')
  async findAll(@User() user: IUser, @Param('networkId') networkId: string) {
    return this.invitationService.findAll(user, networkId);
  }
}
