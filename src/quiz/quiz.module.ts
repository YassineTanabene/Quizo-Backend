import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { SupabaseModule } from 'supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
