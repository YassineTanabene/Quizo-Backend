import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 

// ----------------------------------------------SIGN UP USER AND PROFILE------------------------------------------------------------------------------------------

@Post('createUserProfile')

 createUserProfile(
  @Body() createUserDto: CreateUserDto,
  @Body() createProfileDto: CreateProfileDto
  ): Promise<any> {
  return this.userService.createUserWithProfile(createUserDto, createProfileDto);
}

// ----------------------------------------------Update One USER AND PROFILE------------------------------------------------------------------------------------------
 
@Put('/updateuser/:id')
async updateUser(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
  @Body() updateProfileDto: UpdateProfileDto
): Promise<any> {
  return this.userService.updateUser(id, updateUserDto, updateProfileDto);
}

// ----------------------------------------------Get All USER AND PROFILE------------------------------------------------------------------------------------------
 
  @Get()
  findAll() { 
    return this.userService.getAllUser();
  }
 
  // ----------------------------------------------Get One USER AND PROFILE------------------------------------------------------------------------------------------


  @Get('/getuser/:id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.userService.getUser(id);
  }


  // ----------------------------------------------Delete One USER AND PROFILE------------------------------------------------------------------------------------------

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
 