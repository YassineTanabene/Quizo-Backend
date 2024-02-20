import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from 'supabase/supabase .module';
import { SupabaseService } from 'supabase/supabase.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { GroupModule } from './group/group.module';
import { EmployeeResponseModule } from './employee-response/employee-response.module';
import { GroupReportModule } from './group-report/group-report.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SupabaseModule, UserModule, ProfileModule, AnswerModule, CategoryModule, QuestionModule, QuizModule, GroupModule, EmployeeResponseModule, GroupReportModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,SupabaseService],
})
export class AppModule {}
