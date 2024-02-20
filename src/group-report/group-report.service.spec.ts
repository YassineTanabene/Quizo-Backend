import { Test, TestingModule } from '@nestjs/testing';
import { GroupReportService } from './group-report.service';

describe('GroupReportService', () => {
  let service: GroupReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupReportService],
    }).compile();

    service = module.get<GroupReportService>(GroupReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
