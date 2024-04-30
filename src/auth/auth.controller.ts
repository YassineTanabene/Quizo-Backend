import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './role.enum';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,  private readonly userService: UserService) {}


  @Post('signin')
  create(@Body('email') email:string, @Body('password') password:string): Promise<any>{
    return this.authService.SignInUser(email,password);
  }

  @Post('/logout')
  async signOut() {
        await this.authService.logout();
  }


 
}
