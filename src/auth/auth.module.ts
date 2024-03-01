import { Module  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SupabaseModule } from 'supabase/supabase .module';


@Module({
  imports: [SupabaseModule,JwtModule.register({
    global: true, 
    secret: jwtConstants.secret, //to protect the key 
    signOptions: { expiresIn: '50m'},
  })],
  controllers: [AuthController],
  providers: [AuthService,UserService, ProfileService,],
})
export class AuthModule {}