import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { RolesGuard } from './auth/guards/roles.guard'; 
import { APP_GUARD } from '@nestjs/core'; 
import { SupabaseModule } from 'supabase/supabase .module';
import { AiModule } from './ai/ai.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UploadController } from './uploadPdf/upload/upload.controller';
import { PdfService } from './uploadPdf/pdf/pdf.service';

@Module({
  imports: [
    SupabaseModule,
    UserModule,
    ProfileModule,
    AnswerModule,
    CategoryModule,
    QuestionModule,
    QuizModule,
    GroupModule,
    EmployeeResponseModule,
    GroupReportModule,
    AuthModule,
    AiModule
  ],
  controllers: [AppController,UploadController],
  providers: [
    AppService,
    SupabaseService,
    RolesGuard, 
    PdfService
      
  ],
})
export class AppModule  {

}
