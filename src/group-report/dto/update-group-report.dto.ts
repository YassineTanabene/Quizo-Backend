import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupReportDto } from './create-group-report.dto';

export class UpdateGroupReportDto extends PartialType(CreateGroupReportDto) {
    totalscore:number;
    startingdate:Date;
    endingdate:Date;
    notes:string;
}
