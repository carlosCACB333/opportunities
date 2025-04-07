import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { OpportunityQueryDto } from './dto/query-opportunity.dto';
import { OpportunitiesService } from './opportunities.service';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  findAll(@Query() query: OpportunityQueryDto) {
    return this.opportunitiesService.findAll(query);
  }

  @Get('followed')
  findAllFollowed(@Query() query: OpportunityQueryDto) {
    return this.opportunitiesService.findAllFollowed(query);
  }

  @Patch(':code/follow')
  update(@Param('code') code: string) {
    return this.opportunitiesService.follow(code);
  }
}
