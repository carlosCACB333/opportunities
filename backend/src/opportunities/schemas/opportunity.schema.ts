import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OpportunityType } from '../entities/opportunity.entity';

export type OpportunityDocument = HydratedDocument<Opportunity>;

@Schema()
export class Opportunity {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: OpportunityType })
  type: OpportunityType;

  @Prop({ required: true })
  is_followed: boolean;

  @Prop({ required: true })
  publish_date: Date;

  @Prop({ required: true })
  close_date: Date;
}

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);
