import { Module } from '@nestjs/common';
import { EmployeeResponseService } from './employee-response.service';
import { EmployeeResponseController } from './employee-response.controller';
import { SupabaseModule } from 'supabase/supabase .module';

@Module({
  imports:[SupabaseModule],
  controllers: [EmployeeResponseController],
  providers: [EmployeeResponseService],
})
export class EmployeeResponseModule {}
