import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class ProfileService {

  constructor(private readonly supabaseService: SupabaseService){}

  
// -----------------------------------------------------CreateProfile in public.profile------------------------------------------------------------------------------------------
// this service will be called by the (SIGN UP USER AND PROFILE in tables auth.users and public.profile) service!!!!!!!!!!!!!!!!!!!!

  async CreateProfile(dto:CreateProfileDto,id:string): Promise<any>{

    const supabase = this.supabaseService.getClient();
  
    
  
    const {error : profileError} = await supabase.rpc('createprofile', {firstname : dto.firstname, lastname : dto.lastname , id_user : id });
  
    if (profileError){
      await supabase.auth.admin.deleteUser(id);
      throw new Error(profileError.message);
        
    }

    return console.log("🚀 ~ UserService ~ createProfile ~ User Profile Created Successfully !");

    }
  
  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
