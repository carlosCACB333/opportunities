import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpportunityQueryDto } from './dto/query-opportunity.dto';
import { OpportunityRepository } from './repository/opportunity.repository';
import { Opportunity } from './schemas/opportunity.schema';

@Injectable()
export class OpportunitiesService {
  private readonly repository: OpportunityRepository;
  constructor(
    @InjectModel(Opportunity.name) private model: Model<Opportunity>,
  ) {
    this.repository = new OpportunityRepository(this.model);
  }

  findAll(query: OpportunityQueryDto) {
    const opportunities = this.repository.findAll({
      start_date: query.startDate ? new Date(query.startDate) : undefined,
      end_date: query.endDate ? new Date(query.endDate) : undefined,
      type: query.type,
    });
    return opportunities;
  }

  findAllFollowed(query: OpportunityQueryDto) {
    const opportunities = this.repository.findAll({
      is_followed: true,
      start_date: query.startDate ? new Date(query.startDate) : undefined,
      end_date: query.endDate ? new Date(query.endDate) : undefined,
      type: query.type,
    });
    return opportunities;
  }

  async follow(code: string) {
    const opportunity = await this.repository.findByCode(code);
    if (!opportunity) {
      throw new HttpException('Opportunity not found', HttpStatus.NOT_FOUND);
    }
    const followed = !opportunity.is_followed;
    const updatedOpportunity = this.repository.follow(code, followed);
    return updatedOpportunity;
  }
}
