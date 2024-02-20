import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResponseService } from './employee-response.service';

describe('EmployeeResponseService', () => {
  let service: EmployeeResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeResponseService],
    }).compile();

    service = module.get<EmployeeResponseService>(EmployeeResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
