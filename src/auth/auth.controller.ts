import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Roles } from './decorators';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}


//--------------------------------user.controller_signInUserPWD------------------------------------------------
@Post('signInPwd')
// @Roles('1', '2') // Specify the required roles
// @UseGuards(RolesGuard)

UserSignInPWD(@Body('email') email:string, @Body('password') password:string): Promise<any>{

  return this.authService.SignInUser(email,password);

}
 

// -------------------------------------------------------Logout USER------------------------------------------------------------------------------------------

@Post('logout')
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
