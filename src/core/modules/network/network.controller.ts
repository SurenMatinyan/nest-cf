import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { NetworkService } from './network.service';
import { Roles, UploadFile, User } from '@decorator';
import { IUser } from '@intrefaces';
import * as dto from './network.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IResponseMessage, IResponse } from '@intrefaces';
import { RolesEnum } from '@enum';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @ApiOperation({ summary: 'Create new network' })
  @ApiResponse({ type: IResponseMessage })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Post()
  async create(@User() user: IUser, @Body() dto: dto.CreateNetworkDTO) {
    return this.networkService.create(user, dto);
  }

  @ApiResponse({ type: IResponse })
  @ApiOperation({ summary: 'Get all networks' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Get()
  async findAll(@User() user: IUser, @Query() query) {
    return this.networkService.findAll(user);
  }

  @ApiResponse({ type: IResponse })
  @ApiOperation({ summary: 'Get network by id' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Get(':networkId')
  async findOne(@User() user: IUser, @Param('networkId') networkId: string) {
    return this.networkService.findOne(user, networkId);
  }

  @ApiResponse({ type: IResponseMessage })
  @ApiOperation({ summary: 'Delete network by id' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @Delete(':networkId')
  async delete(@User() user: IUser, @Param('networkId') networkId: string) {
    return this.networkService.delete(user, networkId);
  }

  @ApiResponse({ type: IResponseMessage })
  @ApiOperation({ summary: 'Update network by id' })
  @Roles(RolesEnum.SuperAdminCrossforce)
  @UploadFile('logo')
  @Put(':networkId')
  async update(
    @User() user: IUser,
    @Body() dto: dto.UpdateNetworkDTO,
    @Param('networkId') networkId: string,
    @UploadedFile() file: any,
  ) {
    return this.networkService.update(user, dto, networkId, file);
  }
}
