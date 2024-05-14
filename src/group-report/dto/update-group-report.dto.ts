import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupReportDto } from './create-group-report.dto';
import { UUID } from 'crypto';

export class UpdateGroupReportDto extends PartialType(CreateGroupReportDto) {
    quizid:UUID;
    userid:UUID;
    totalscore:number;
    startingdate:Date;
    endingdate:Date;
    note:string;
    email:string;

}