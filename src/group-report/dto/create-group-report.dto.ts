import { UUID } from "crypto";

export class CreateGroupReportDto {
    quizid:UUID;
    userid:UUID;
    totalscore:number;
    startingdate:Date;
    endingdate:Date;
    note:string;
    email:string;
    groupid:UUID;
    statut:string;

}
