import { Model } from 'mongoose';
import {
  OpportunityEntity,
  OpportunityType,
} from '../entities/opportunity.entity';
import { Opportunity } from '../schemas/opportunity.schema';
import { OpportunityRepository } from './opportunity.repository';

describe('OpportunityRepository', () => {
  let repository: OpportunityRepository;
  let model: jest.Mocked<Model<Opportunity>>;

  const mockData = {
    code: 'OPP123',
    publish_date: new Date('2024-01-01'),
    close_date: new Date('2025-01-01'),
    type: OpportunityType.AGILE,
    is_followed: true,
    title: 'Mock Opportunity',
  };

  const mockEntity = OpportunityEntity.fromSchema(mockData);

  beforeEach(() => {
    model = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    } as any;

    repository = new OpportunityRepository(model);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should build query and return mapped results', async () => {
      const mockLean = jest.fn().mockResolvedValue([mockData]);
      model.find.mockReturnValue({ sort: () => ({ lean: mockLean }) } as any);

      const result = await repository.findAll({
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-02-01'),
        type: OpportunityType.AGILE,
        is_followed: true,
      });

      expect(model.find).toHaveBeenCalledWith(
        expect.objectContaining({
          publish_date: {
            $gte: new Date('2024-01-01'),
            $lte: new Date('2024-02-01'),
          },
          type: OpportunityType.AGILE,
          is_followed: true,
          close_date: expect.any(Object),
        }),
      );

      expect(result).toEqual([mockEntity]);
    });
  });

  describe('findByCode', () => {
    it('should return a matching opportunity', async () => {
      const mockLean = jest.fn().mockResolvedValue(mockData);
      model.findOne.mockReturnValue({ lean: mockLean } as any);

      const result = await repository.findByCode('OPP123');

      expect(model.findOne).toHaveBeenCalledWith({ code: 'OPP123' });
      expect(result).toEqual(mockData);
    });
  });

  describe('follow', () => {
    it('should update is_followed and return updated entity', async () => {
      const mockExec = jest.fn().mockResolvedValue(mockData);
      model.findOneAndUpdate.mockReturnValue({ exec: mockExec } as any);

      const result = await repository.follow('OPP123', true);

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { code: 'OPP123' },
        { is_followed: true },
        { new: true, lean: true },
      );
      expect(result).toEqual(mockEntity);
    });

    it('should return null if opportunity not found', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      model.findOneAndUpdate.mockReturnValue({ exec: mockExec } as any);

      const result = await repository.follow('INVALID', true);

      expect(result).toBeNull();
    });
  });
});
