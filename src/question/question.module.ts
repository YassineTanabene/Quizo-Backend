import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SupabaseModule } from 'supabase/supabase.module';
import { AnswerService } from 'src/answer/answer.service';

@Module({
  imports: [SupabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService,AnswerService],
})
export class QuestionModule {}
