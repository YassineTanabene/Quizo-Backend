import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SupabaseModule } from 'supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
