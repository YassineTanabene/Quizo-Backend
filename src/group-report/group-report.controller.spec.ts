import { Test, TestingModule } from '@nestjs/testing';
import { GroupReportController } from './group-report.controller';
import { GroupReportService } from './group-report.service';

describe('GroupReportController', () => {
  let controller: GroupReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupReportController],
      providers: [GroupReportService],
    }).compile();

    controller = module.get<GroupReportController>(GroupReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
