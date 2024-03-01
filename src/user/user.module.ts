import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseModule } from 'supabase/supabase .module';
import { ProfileService } from 'src/profile/profile.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SupabaseModule,JwtModule],
  controllers: [UserController],
  providers: [UserService,ProfileService],
})
export class UserModule {}
