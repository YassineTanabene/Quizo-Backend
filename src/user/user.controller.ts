// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
// import { Roles } from 'src/auth/decorators';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';


// @Controller('user')
// @UseGuards(AuthGuard,RolesGuard)
// @Roles(1,2)
// export class UserController {

//   constructor(private readonly userService: UserService) {}

// // ----------------------------------------------SIGN UP USER AND PROFILE------------------------------------------------------------------------------------------

//   @Post('createUserProfile')

//   createUserProfile(@Body()CreateUserDto,@Body() CreateProfileDto,@Body('phone') phone: string): Promise<any>{
  
//     return this.userService.createUserWithProfile(CreateUserDto,CreateProfileDto,phone);
  
//   }
  


//   @Get()
//   findAll() {
//     return this.userService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.userService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }
// }

import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserService } from './user.service';
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