import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GroupReportService } from './group-report.service';
import { CreateGroupReportDto } from './dto/create-group-report.dto';
import { UpdateGroupReportDto } from './dto/update-group-report.dto';

@Controller('group_report')
export class GroupReportController {
  constructor(private readonly groupReportService: GroupReportService) {}

  @Post('createGroupReport')
  create(@Body() createGroupReportDto: CreateGroupReportDto) {
    return this.groupReportService.createGroupReport(createGroupReportDto);
  }

  @Get('getAllGroupReport')
  findAll() {
    return this.groupReportService.getAllGroupReport();
  }

  @Get('getOneGroupReport/:id')
  findOne(@Param('id') id: string) {
    return this.groupReportService.getOneGroupReport(id);
  }

  @Put('updateGroupReport/:id')
  update(@Param('id') id: string, @Body() updateGroupReportDto: UpdateGroupReportDto) {
    return this.groupReportService.updateGroupReport(id, updateGroupReportDto);
  }
 
  @Delete('deleteGroupReport/:id')
  remove(@Param('id') id: string) {
    return this.groupReportService.removeGroupReport(id);
  }
}
