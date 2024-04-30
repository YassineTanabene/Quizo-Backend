import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { SupabaseModule } from 'supabase/supabase .module';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';

@Module({
  imports:[SupabaseModule],
  controllers: [QuizController],
  providers: [QuizService,QuestionService,AnswerService],
})
export class QuizModule {}
   