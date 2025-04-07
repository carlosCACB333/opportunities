import { Test, TestingModule } from '@nestjs/testing';
import { OpportunityQueryDto } from './dto/query-opportunity.dto';
import { OpportunityType } from './entities/opportunity.entity';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';

describe('OpportunitiesController', () => {
  let controller: OpportunitiesController;
  let service: OpportunitiesService;

  const mockService = {
    findAll: jest.fn(),
    findAllFollowed: jest.fn(),
    follow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpportunitiesController],
      providers: [
        {
          provide: OpportunitiesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OpportunitiesController>(OpportunitiesController);
    service = module.get<OpportunitiesService>(OpportunitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call service.findAll with query', () => {
      const query: OpportunityQueryDto = {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        type: OpportunityType.AGILE,
      };

      const result = [{ code: 'OPP1' }];
      mockService.findAll.mockReturnValue(result);

      const response = controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(response).toBe(result);
    });
  });

  describe('findAllFollowed', () => {
    it('should call service.findAllFollowed with query', () => {
      const query: OpportunityQueryDto = {
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        type: OpportunityType.AGILE,
      };

      const result = [{ code: 'OPP2' }];
      mockService.findAllFollowed.mockReturnValue(result);

      const response = controller.findAllFollowed(query);

      expect(service.findAllFollowed).toHaveBeenCalledWith(query);
      expect(response).toBe(result);
    });
  });

  describe('update (follow)', () => {
    it('should call service.follow with code param', async () => {
      const code = 'OPP123';
      const expected = { code, is_followed: true };

      mockService.follow.mockResolvedValue(expected);

      const response = await controller.update(code);

      expect(service.follow).toHaveBeenCalledWith(code);
      expect(response).toBe(expected);
    });
  });
});
