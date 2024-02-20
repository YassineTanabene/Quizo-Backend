import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupReportService } from './group-report.service';
import { CreateGroupReportDto } from './dto/create-group-report.dto';
import { UpdateGroupReportDto } from './dto/update-group-report.dto';

@Controller('group-report')
export class GroupReportController {
  constructor(private readonly groupReportService: GroupReportService) {}

  @Post()
  create(@Body() createGroupReportDto: CreateGroupReportDto) {
    return this.groupReportService.create(createGroupReportDto);
  }

  @Get()
  findAll() {
    return this.groupReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupReportDto: UpdateGroupReportDto) {
    return this.groupReportService.update(+id, updateGroupReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupReportService.remove(+id);
  }
}
