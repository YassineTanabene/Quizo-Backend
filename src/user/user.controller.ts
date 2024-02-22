import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

// ----------------------------------------------SIGN UP USER AND PROFILE------------------------------------------------------------------------------------------

  @Post('createUserProfile')

  createUserProfile(@Body()CreateUserDto,@Body() CreateProfileDto,@Body('phone') phone: string): Promise<any>{
  
    return this.userService.createUserWithProfile(CreateUserDto,CreateProfileDto,phone);
  
  }
  


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
