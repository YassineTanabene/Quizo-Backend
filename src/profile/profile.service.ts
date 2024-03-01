import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class ProfileService {

  constructor(private readonly supabaseService: SupabaseService){}

  // -----------------------------------------------------Create Profile in public.profile------------------------------------------------------------------------------------------

  async CreateProfile(dto:CreateProfileDto,id:string): Promise<any>{
    const supabase = this.supabaseService.getClient();
    const {error : profileError} = await supabase.rpc('create_profile_user', {
      firstname : dto.firstname, 
      lastname : dto.lastname, 
      address: dto.address,
      role :dto.role ,
      birthdate: dto.birthdate,
      joiningdate: dto.joiningdate,
      profilepicture: dto.profilepicture,
      groupe: dto.groupe,
      id_user : id 
    });
    if (profileError){
      await supabase.auth.admin.deleteUser(id);
      throw new Error(profileError.message);   
    }
    return console.log("🚀 ~ UserService ~ createProfile ~ User Profile Created Successfully !");
    } 


// ----------------------------------------------Get All Profile in table public.profile with RPC------------------------------------------------------------------------------------------

  async getAllProfile() : Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase.rpc('get_all_profiles');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }
  }

  // ----------------------------------------------Get One Profile in table public.profile with RPC------------------------------------------------------------------------------------------

  async getUserProfile(id: string): Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase.rpc('get_user_profile', { user_id: id });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }
  }

 
    
  // ----------------------------------------------Update Profile in table public.profile with RPC------------------------------------------------------------------------------------------


  async updateProfile(
    id: string,
   updateProfileDto: UpdateProfileDto
  ): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data,error } = await supabase.rpc('update_profile', {
      id: id,
      new_firstname: updateProfileDto.firstname,
      new_lastname: updateProfileDto.lastname,
      new_address: updateProfileDto.address,
      new_role:updateProfileDto.role,
      new_birthdate: updateProfileDto.birthdate,
      new_joiningdate: updateProfileDto.joiningdate,
      new_profilepicture: updateProfileDto.profilepicture,
    });
  
    if (error) {
      throw new Error(error.message);
    }
    return console.log("Profile updated successfully !",data)
  }
  







   // async updateUserName(id: string,new_firstname: string):Promise<any>{
  //   const supabase = this.supabaseService.getClient();
  //   const { data, error } = await supabase.rpc('first_name_update', { id: id, first_name: new_firstname});
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return console.log("🚀 ~ UserService ~ updateUserName ~ success:");
  // }
}
