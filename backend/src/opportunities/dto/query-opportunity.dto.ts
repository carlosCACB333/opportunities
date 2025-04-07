import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsOptional } from 'class-validator';
import { OpportunityType } from '../entities/opportunity.entity';

export class OpportunityQueryDto {
  @ApiPropertyOptional({
    description: 'Start date in ISO 8601 format',
    type: String,
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date in ISO 8601 format',
    type: String,
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Type of the opportunity',
    enum: OpportunityType,
  })
  @IsOptional()
  @IsEnum(OpportunityType)
  type?: OpportunityType;
}
