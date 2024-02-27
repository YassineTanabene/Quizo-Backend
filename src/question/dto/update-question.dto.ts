import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    
    id_quiz: string;
    question_content: string; 
    explantation: string;
    questiontype: string; 
}
