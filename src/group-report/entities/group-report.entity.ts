import { UUID } from "crypto";

export class GroupReport {
    idReport:UUID;
    totalscore:number;
    startingdate:Date;
    enddate:Date;
    notes:string;
}