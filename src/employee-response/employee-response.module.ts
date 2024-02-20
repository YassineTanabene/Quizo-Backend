import { Module } from '@nestjs/common';
import { EmployeeResponseService } from './employee-response.service';
import { EmployeeResponseController } from './employee-response.controller';

@Module({
  controllers: [EmployeeResponseController],
  providers: [EmployeeResponseService],
})
export class EmployeeResponseModule {}
