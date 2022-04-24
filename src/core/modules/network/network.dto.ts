import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BillingInterval } from '@enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SuperAdminInvitationDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;
}

class OneTimePaymentDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateNetworkDTO {
  @ApiProperty({ type: [SuperAdminInvitationDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SuperAdminInvitationDTO)
  @IsOptional()
  superAdmin?: SuperAdminInvitationDTO[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subDirectory: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxMember: number;

  @ApiProperty({ enum: BillingInterval })
  @IsNotEmpty()
  @IsEnum(BillingInterval)
  billingType: BillingInterval;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  billingPrice: number;

  @ApiProperty({ type: [OneTimePaymentDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OneTimePaymentDTO)
  @IsOptional()
  oneTimePayments?: OneTimePaymentDTO[];
}

export class UpdateNetworkDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subDirectory: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxMember: number;

  @ApiProperty({ enum: BillingInterval })
  @IsNotEmpty()
  @IsEnum(BillingInterval)
  billingType: BillingInterval;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  billingPrice: number;

  @ApiProperty({ type: [OneTimePaymentDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OneTimePaymentDTO)
  @IsOptional()
  oneTimePayments?: OneTimePaymentDTO[];
}
