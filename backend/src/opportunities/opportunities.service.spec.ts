import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { OpportunityType } from './entities/opportunity.entity';
import { OpportunitiesService } from './opportunities.service';
import { OpportunityRepository } from './repository/opportunity.repository';
import { Opportunity } from './schemas/opportunity.schema';

describe('OpportunitiesService', () => {
  let service: OpportunitiesService;
  let repository: OpportunityRepository;

  const mockOpportunityModel = {};

  const mockRepository = {
    findAll: jest.fn(),
    findByCode: jest.fn(),
    follow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpportunitiesService,
        {
          provide: getModelToken(Opportunity.name),
          useValue: mockOpportunityModel,
        },
      ],
    })
      .overrideProvider(OpportunitiesService)
      .useFactory({
        factory: () => {
          const service = new OpportunitiesService(mockOpportunityModel as any);
          // @ts-ignore for testing purpose
          service.repository = mockRepository;
          return service;
        },
      })
      .compile();

    service = module.get<OpportunitiesService>(OpportunitiesService);
    repository = service['repository'];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call repository.findAll with parsed query', () => {
      const query = {
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        type: OpportunityType.AGILE,
      };
      const expected = [{ name: 'op1' }];
      mockRepository.findAll.mockReturnValue(expected);

      const result = service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith({
        start_date: new Date(query.startDate),
        end_date: new Date(query.endDate),
        type: query.type,
      });
      expect(result).toBe(expected);
    });
  });

  describe('findAllFollowed', () => {
    it('should call repository.findAll with is_followed=true and parsed query', () => {
      const query = {
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        type: OpportunityType.AGILE,
      };
      const expected = [{ name: 'op2' }];
      mockRepository.findAll.mockReturnValue(expected);

      const result = service.findAllFollowed(query);

      expect(repository.findAll).toHaveBeenCalledWith({
        is_followed: true,
        start_date: new Date(query.startDate),
        end_date: new Date(query.endDate),
        type: query.type,
      });
      expect(result).toBe(expected);
    });
  });

  describe('follow', () => {
    it('should throw if opportunity not found', async () => {
      mockRepository.findByCode.mockResolvedValue(null);

      await expect(service.follow('ABC123')).rejects.toThrow(
        new HttpException('Opportunity not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should toggle follow status and call follow()', async () => {
      const code = 'OPP123';
      const opportunity = { code, is_followed: false };
      const updated = { code, is_followed: true };

      mockRepository.findByCode.mockResolvedValue(opportunity);
      mockRepository.follow.mockResolvedValue(updated);

      const result = await service.follow(code);

      expect(repository.findByCode).toHaveBeenCalledWith(code);
      expect(repository.follow).toHaveBeenCalledWith(code, true);
      expect(result).toBe(updated);
    });
  });
});
