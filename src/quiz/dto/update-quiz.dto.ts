import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { Timestamp } from 'typeorm';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
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
