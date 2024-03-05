import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Roles } from './decorators';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';
import { SignOut } from '@supabase/supabase-js';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}


//--------------------------------user.controller_signInUserPWD------------------------------------------------
@UseGuards(RolesGuard)
@Roles(1,2)
@Post('signIn')
// @Roles('1', '2') // Specify the required roles
UserSignInPWD(@Body('email') email:string, @Body('password') password:string): Promise<any>{

  return this.authService.SignInUser(email,password);

}
 

// -------------------------------------------------------Logout USER------------------------------------------------------------------------------------------
@UseGuards(AuthGuard,RolesGuard)
@Roles(1,2)
@Post('signout')
logoutUser(){
  return this.authService.logout();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------


@Post()
create(@Body() createAuthDto: CreateAuthDto) {
  return this.authService.create(createAuthDto);
}


  @Get('profile')
  getProfile(@Request() req, @Body('id')id:string) {
    return this.authService.getUserProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
