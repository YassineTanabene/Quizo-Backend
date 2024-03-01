import { UUID } from "crypto";

export class Quiz {
    idquiz:UUID;
    quiztitle:string;
    noofquestions:number;
    duration:Date;
    noofinvitations:number;
    material:string;
    difficultylevel:string;
    creator:string;
    deadline:string;
}
