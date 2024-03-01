// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseModule } from 'supabase/supabase.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [SupabaseModule, ProfileModule,AuthModule],
  controllers: [UserController],
  providers: [UserService,ProfileService,AuthService],
})
export class UserModule {}
