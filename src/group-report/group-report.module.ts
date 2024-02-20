import { Module } from '@nestjs/common';
import { GroupReportService } from './group-report.service';
import { GroupReportController } from './group-report.controller';

@Module({
  controllers: [GroupReportController],
  providers: [GroupReportService],
})
export class GroupReportModule {}
