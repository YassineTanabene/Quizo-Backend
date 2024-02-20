import { Injectable } from '@nestjs/common';
import { CreateEmployeeResponseDto } from './dto/create-employee-response.dto';
import { UpdateEmployeeResponseDto } from './dto/update-employee-response.dto';

@Injectable()
export class EmployeeResponseService {
  create(createEmployeeResponseDto: CreateEmployeeResponseDto) {
    return 'This action adds a new employeeResponse';
  }

  findAll() {
    return `This action returns all employeeResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeResponse`;
  }

  update(id: number, updateEmployeeResponseDto: UpdateEmployeeResponseDto) {
    return `This action updates a #${id} employeeResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeResponse`;
  }
}
