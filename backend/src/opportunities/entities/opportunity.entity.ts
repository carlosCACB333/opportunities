import { Opportunity } from '../schemas/opportunity.schema';

export class OpportunityEntity {
  code: string;
  title: string;
  type: OpportunityType;
  is_followed: boolean;
  publish_date: Date;
  close_date: Date;

  constructor(
    code: string,
    title: string,
    type: OpportunityType,
    is_followed: boolean,
    publish_date: Date,
    close_date: Date,
  ) {
    this.code = code;
    this.title = title;
    this.type = type;
    this.is_followed = is_followed;
    this.publish_date = publish_date;
    this.close_date = close_date;
  }

  static fromSchema(opportunity: Opportunity): OpportunityEntity {
    return new OpportunityEntity(
      opportunity.code,
      opportunity.title,
      opportunity.type,
      opportunity.is_followed,
      opportunity.publish_date,
      opportunity.close_date,
    );
  }
}

export enum OpportunityType {
  AGILE = 'agile',
  TENDER = 'tender',
}
