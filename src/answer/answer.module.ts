import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SupabaseModule } from 'supabase/supabase.module';

@Module({
  imports : [SupabaseModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
