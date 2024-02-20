import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeResponseService } from './employee-response.service';
import { CreateEmployeeResponseDto } from './dto/create-employee-response.dto';
import { UpdateEmployeeResponseDto } from './dto/update-employee-response.dto';

@Controller('employee-response')
export class EmployeeResponseController {
  constructor(private readonly employeeResponseService: EmployeeResponseService) {}

  @Post()
  create(@Body() createEmployeeResponseDto: CreateEmployeeResponseDto) {
    return this.employeeResponseService.create(createEmployeeResponseDto);
  }

  @Get()
  findAll() {
    return this.employeeResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeResponseDto: UpdateEmployeeResponseDto) {
    return this.employeeResponseService.update(+id, updateEmployeeResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeResponseService.remove(+id);
  }
}
