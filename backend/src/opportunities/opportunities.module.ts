import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';
import { Opportunity, OpportunitySchema } from './schemas/opportunity.schema';

@Module({
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  imports: [
    MongooseModule.forFeature([
      { name: Opportunity.name, schema: OpportunitySchema },
    ]),
  ],
})
export class OpportunitiesModule {}
