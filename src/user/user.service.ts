import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';


@Injectable()
export class UserService {

  constructor(private readonly supabaseService: SupabaseService, private readonly ProfileService:ProfileService){}
  

// ----------------------------------------------SIGN UP USER AND PROFILE in tables auth.users and public.profile------------------------------------------------------------------------------------------


async createUserWithProfile(createuserdto:CreateUserDto, createprofiledto:CreateProfileDto, phone: string ): Promise<any> {
  const supabase = this.supabaseService.getClient();

  try {

    const { data: { user }, error: signUpError } = await supabase.auth.signUp( createuserdto );
    
    if (signUpError) {

      throw new Error(signUpError.message);
    }

    this.ProfileService.CreateProfile(createprofiledto,user.id);

    this.updateUserPhone(user.id,phone)

    return "User Profile Created Successfully ! ";

  } catch (error) {

    throw new Error("Error creating user with profile: " + error.message);
  }
 
}







// -----------------------------------------------------CreateProfile in public.profile------------------------------------------------------------------------------------------
// this service will be called by the (SIGN UP USER AND PROFILE in tables auth.users and public.profile) service!!!!!!!!!!!!!!!!!!!!




// ----------------------------------------------UpdateUserPhone in table auth.users with RPC------------------------------------------------------------------------------------------
// this service will be called by the service createUserWithProfile

async updateUserPhone(id: string,new_phone: string):Promise<any>{
  const supabase = this.supabaseService.getClient();

  const { data, error } = await supabase.rpc('phone_update', { id_user: id, phone_number: new_phone});

  if (error) {

    throw new Error(error.message);

  }

  return data;

}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
