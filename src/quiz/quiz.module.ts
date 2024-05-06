import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { SupabaseModule } from 'supabase/supabase.module';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports:[SupabaseModule],
  controllers: [QuizController],
  providers: [QuizService,AnswerService,QuestionService],
})
export class QuizModule {}
