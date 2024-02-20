import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResponseController } from './employee-response.controller';
import { EmployeeResponseService } from './employee-response.service';

describe('EmployeeResponseController', () => {
  let controller: EmployeeResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeResponseController],
      providers: [EmployeeResponseService],
    }).compile();

    controller = module.get<EmployeeResponseController>(EmployeeResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
