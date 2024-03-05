import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';

@Controller('profile')
@UseGuards(AuthGuard,RolesGuard)
@Roles(1,2)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  
// -----------------------------------------------------CreateProfile in public.profile------------------------------------------------------------------------------------------

// @Post('createUserProfile')

//   createProfile(@Body('firstname') firstname: string , @Body('lastname') lastname: string ,@Body('role') role: number,@Body('phone') phone: string): Promise<any>{

//   return this.profileService.CreateProfile(firstname,lastname,role,phone);

// }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
