// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseModule } from 'supabase/supabase.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [SupabaseModule, ProfileModule],
  controllers: [UserController],
  providers: [UserService,ProfileService],
})
export class UserModule {}
