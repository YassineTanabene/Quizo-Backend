import { Module } from '@nestjs/common';
import { GroupReportService } from './group-report.service';
import { GroupReportController } from './group-report.controller';
import { SupabaseModule } from 'supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [GroupReportController],
  providers: [GroupReportService],
})
export class GroupReportModule {}