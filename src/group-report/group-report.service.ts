import { Injectable } from '@nestjs/common';
import { CreateGroupReportDto } from './dto/create-group-report.dto';
import { UpdateGroupReportDto } from './dto/update-group-report.dto';

@Injectable()
export class GroupReportService {
  create(createGroupReportDto: CreateGroupReportDto) {
    return 'This action adds a new groupReport';
  }

  findAll() {
    return `This action returns all groupReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupReport`;
  }

  update(id: number, updateGroupReportDto: UpdateGroupReportDto) {
    return `This action updates a #${id} groupReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupReport`;
  }
}
