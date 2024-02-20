import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeResponseDto } from './create-employee-response.dto';

export class UpdateEmployeeResponseDto extends PartialType(CreateEmployeeResponseDto) {}
