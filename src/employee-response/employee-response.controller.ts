import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EmployeeResponseService } from './employee-response.service';
import { CreateEmployeeResponseDto } from './dto/create-employee-response.dto';
import { UpdateEmployeeResponseDto } from './dto/update-employee-response.dto';

@Controller('employeeResponse')
export class EmployeeResponseController {
  constructor(private readonly employeeResponseService: EmployeeResponseService) {}

  //-----------------------------------------------------Create Employee Response in public.employee_response------------------------------------------------------------------------------------------

  @Post('createEmployeeResponse')
  create(@Body() createDto: CreateEmployeeResponseDto) {
    return this.employeeResponseService.CreateEmployeeResponse(createDto);
  }

    //-----------------------------------------------------Get All Employee Response in public.employee_response------------------------------------------------------------------------------------------

  @Get("getAllEmployeeResponse")
  findAll() {
    return this.employeeResponseService.getAllEmployeeResponse();
  }

    //-----------------------------------------------------Get One Employee Response in public.employee_response------------------------------------------------------------------------------------------

  @Get('getAllEmployeeResponse/:id')
  findOne(@Param('id') id: string) {
    return this.employeeResponseService.getOneEmployeeResponse(id)
  }

    //-----------------------------------------------------Update Employee Response in public.employee_response------------------------------------------------------------------------------------------

  @Put('/updateEmployeeResponse/:id')
  update(@Param('id') id: string,@Body() updateDto:UpdateEmployeeResponseDto) {
    return this.employeeResponseService.updateEmployeeResponse(id,updateDto);
  }
  
    //-----------------------------------------------------Delete Employee Response in public.employee_response------------------------------------------------------------------------------------------

  @Delete('deleteEmployeeResponse/:id')
  remove(@Param('id') id: string) {
    return this.employeeResponseService.removeEmployeeRespone(id);
  }
}
