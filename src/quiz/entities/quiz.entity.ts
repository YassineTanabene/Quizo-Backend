import { Timestamp } from "typeorm";

export class Quiz {
    idquiz: string;
    id_category: string;
    quiztitle: string; 
    material: string;
    duration: Timestamp;
    deadline: Date;
    noofinvitations: number;
    difficultylevel: string;
    noofquestions: number;
    creator: string;
}
