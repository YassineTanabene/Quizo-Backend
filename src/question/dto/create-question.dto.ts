import { CreateAnswerDto } from "src/answer/dto/create-answer.dto";

export class CreateQuestionDto {

    id_quiz: string;
    question_content: string; 
    explantation: string;
    questiontype: string; 
    answers: CreateAnswerDto[]; 
    
}
