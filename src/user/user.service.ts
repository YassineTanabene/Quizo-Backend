// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { SupabaseService } from 'supabase/supabase.service';
// import { User } from './entities/user.entity';
// import { ProfileService } from 'src/profile/profile.service';
// import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
// import { AuthService } from 'src/auth/auth.service';

// @Injectable()
// export class UserService {

//   constructor(private readonly supabaseService: SupabaseService, private readonly ProfileService:ProfileService, private readonly AuthService : AuthService ){}
  

// // ----------------------------------------------SIGN UP USER AND PROFILE in tables auth.users and public.profile------------------------------------------------------------------------------------------


// async createUserWithProfile(createuserdto:CreateUserDto, createprofiledto:CreateProfileDto, phone: string ): Promise<any> {

//   const supabase = this.supabaseService.getClient();

//   try {

//     const { data: { user }, error: signUpError } = await supabase.auth.signUp(createuserdto);

//     if (signUpError) {

//       throw new Error(signUpError.message);

//     }
//     this.ProfileService.CreateProfile(createprofiledto,user.id);

//     this.updateUserPhone(user.id,phone)
//     await supabase.auth.admin.updateUserById(user.id,{user_metadata:{role: createuserdto.role}})


//     return "User Profile Created Successfully ! ";

//   } catch (error) {

//     throw new Error("Error creating user with profile: " + error.message);
    
//   }
 
// }


// // ----------------------------------------------UpdateUserPhone in table auth.users with RPC------------------------------------------------------------------------------------------
// // this service will be called by the service createUserWithProfile

// async updateUserPhone(id: string,new_phone: string):Promise<any>{
//   const supabase = this.supabaseService.getClient();

//   const { data, error } = await supabase.rpc('phone_update', { id_user: id, phone_number: new_phone});

//   if (error) {

//     throw new Error(error.message);

//   }

//   return data;

// }


// //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   findAll() {
//     return `This action returns all user`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { User } from './entities/user.entity';




@Injectable()
export class UserService {
constructor(
  private readonly supabaseService: SupabaseService, private readonly ProfileService:ProfileService){}
  

// ----------------------------------------------SIGN UP USER AND PROFILE in tables auth.users and public.profile------------------------------------------------------------------------------------------

async createUserWithProfile(createuserdto:CreateUserDto, createprofiledto:CreateProfileDto ): Promise<any> {

  const supabase = this.supabaseService.getClient();

  try {

    const { data: { user }, error: signUpError } = await supabase.auth.signUp(     
{      email: createuserdto.email,
      password: createuserdto.password,
      } );

    if (signUpError) {

      throw new Error(signUpError.message);

    }
     this.ProfileService.CreateProfile(createprofiledto,user.id);

    await supabase.auth.admin.updateUserById(user.id,{user_metadata:{role: createuserdto.role}})
    await supabase.auth.admin.updateUserById(user.id,{phone: createuserdto.phone})


    return "User Profile Created Successfully ! ";

  } catch (error) {

    throw new Error("Error creating user with profile: " + error.message); 

  } 
 
}


// ----------------------------------------------Get One User in table auth.users and public.profile ------------------------------------------------------------------------------------------


async getUser(id: string): Promise<any> {
  const supabase = this.supabaseService.getClient(); 

  try {
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(id);
    if (userError) {
      throw new Error(userError.message);
    }
    const userProfile = await this.ProfileService.getUserProfile(id);

    const combinedData = {
      user: userData,
      profile: userProfile
    };
    return combinedData;
  } catch (error) {
    throw new Error(error.message);
  }
}


// ----------------------------------------------GetALLUsers in table auth.users and public.profile ------------------------------------------------------------------------------------------

async getAllUser(): Promise<any> {
  const supabase = this.supabaseService.getClient(); 
  try {
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) {
      throw new Error(userError.message);
    }
    const combinedData = [];
    if ('users' in userData) {
      for (const user of userData.users) {
        const userProfile = await this.ProfileService.getUserProfile(user.id);     
        combinedData.push({
          user: user,
          profile: userProfile
        }); 
      }
    }
    return combinedData;
  } catch (error) {
    throw new Error(error.message);
  }
}


// ----------------------------------------------Update One User in table auth.users and public.profile ------------------------------------------------------------------------------------------


async updateUser(id: string, updateUserDto: UpdateUserDto, updateProfileDto: UpdateProfileDto): Promise<any> {
  const supabase = this.supabaseService.getClient();
  try {
    // Mettre à jour les informations de l'utilisateur dans la table auth.users
    const { data: userData, error: userError } = await supabase.auth.admin.updateUserById(id, {
      email: updateUserDto.email,
      password: updateUserDto.password,
      phone: updateUserDto.phone
    });
    if (userError) {
      throw new Error(userError.message);
    }
    console.log("🚀 User updated successfully:", userData);

    // Mettre à jour les informations de profil dans la table public.profile
    const profileData = await this.ProfileService.updateProfile(id, updateProfileDto);
    console.log("Profile updated successfully:", profileData);

    return { userData,profileData };
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
}



// ----------------------------------------------Delete One User in table auth.users and public.profile ------------------------------------------------------------------------------------------

  async removeUser(id: string) {
    const supabase = this.supabaseService.getClient(); 
    const { error } = await supabase.auth.admin.deleteUser(id)

    if (error) {throw new Error(error.message);}
    return console.log("🚀 ~ UserService ~ removeUser ~ success:");
  }



}