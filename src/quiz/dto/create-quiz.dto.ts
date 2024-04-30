import { CreateAnswerDto } from "src/answer/dto/create-answer.dto";
import { CreateQuestionDto } from "src/question/dto/create-question.dto";

export class CreateQuizDto {
    id_category: string;
    quiztitle: string;
    material: string;
    duration: Date;
    deadline: Date;
    noofinvitations: number;
    difficultylevel: string;
    noofquestions: number;
    creator: string;
}