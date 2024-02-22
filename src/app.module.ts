import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from 'supabase/supabase.service';
import { SupabaseModule } from 'supabase/supabase.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { GroupReportModule } from './group-report/group-report.module';
import { EmployeeResponseModule } from './employee-response/employee-response.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [SupabaseModule, UserModule, AuthModule, GroupModule, CategoryModule, QuizModule, QuestionModule, AnswerModule, GroupReportModule, EmployeeResponseModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService,SupabaseService],
})
export class AppModule {}
