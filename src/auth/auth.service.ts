import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { SignOut } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService){}


 // -----------------------------------------------------SignIn¨User with email and password------------------------------------------------------------------------------------------

 async SignInUser(email: string, password: string): Promise<any> {
  const supabase = this.supabaseService.getClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Assuming there is a user ID in the authentication data
    const userId = data?.user.id;

    if (!userId) {
      throw new Error('User ID not found in authentication data');
    }

    // Fetch the user's profile based on the user ID
    const profile = await this.getUserProfile(userId);

    // console.log("🚀 ~ UserService ~ signInUser ~ SignInsuccess!");

    // const profileRole: string[] = Array.isArray(profile?.role)
    // ?profile.role: [profile.role?.toString()];

    // Return authentication data and user's profile and role
    // , userProfile: profile teb3a el return 
    return { authenticationData: data, profile };
  } catch (error) {
    throw new Error(`Error signing in: ${error.message}`);
  }
}

async getUserProfile(userId: string): Promise<any> {
  const supabase = this.supabaseService.getClient();

  try {
    
    const { data, error } = await supabase
      .from('profile')
      .select('firstname,lastname')
      .eq('idprofile', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw new Error('Error fetching user profile');
  }
}




// -------------------------------------------------------Logout USER------------------------------------------------------------------------------------------

async logout():Promise<any>{

  const supabase = this.supabaseService.getClient();

  let { error } = await supabase.auth.signOut({ scope: 'global' })

  if (error) {
    throw new Error(error.message);
  }
  console.log("🚀 ~ UserService ~ logout ~ logout Success !");
  return "Logout successful !"
  }




  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }





}
