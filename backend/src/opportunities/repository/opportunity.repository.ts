import { FilterQuery, Model } from 'mongoose';
import { OpportunityEntity } from '../entities/opportunity.entity';
import { Opportunity } from '../schemas/opportunity.schema';

export class OpportunityRepository {
  constructor(private model: Model<Opportunity>) {}

  async findAll({
    start_date,
    end_date,
    type,
    is_followed,
  }: {
    start_date?: Date;
    end_date?: Date;
    type?: string;
    is_followed?: boolean;
  } = {}): Promise<OpportunityEntity[]> {
    const query: FilterQuery<Opportunity> = {
      close_date: { $gte: new Date() },
    };

    if (start_date && end_date) {
      query.publish_date = {
        $gte: start_date,
        $lte: end_date,
      };
    } else if (start_date) {
      query.publish_date = { $gte: start_date };
    } else if (end_date) {
      query.publish_date = { $lte: end_date };
    }

    if (type) {
      query.type = type;
    }

    if (is_followed !== undefined) {
      query.is_followed = is_followed;
    }

    const res = await this.model.find(query).sort({ publish_date: -1 }).lean();

    return res.map((opportunity) => OpportunityEntity.fromSchema(opportunity));
  }

  async findByCode(code: string): Promise<OpportunityEntity | null> {
    return this.model.findOne({ code }).lean();
  }

  async follow(
    code: string,
    followed: boolean,
  ): Promise<OpportunityEntity | null> {
    const res = await this.model
      .findOneAndUpdate(
        { code },
        { is_followed: followed },
        { new: true, lean: true },
      )
      .exec();

    if (!res) {
      return null;
    }

    return OpportunityEntity.fromSchema(res);
  }
}
