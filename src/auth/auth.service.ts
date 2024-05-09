import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class AuthService {

  constructor(private readonly supabaseService: SupabaseService) {}


  async signInWithEmail(email: string, redirectTo: string, quizId: string): Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `http://localhost:5173?quizId=${quizId}`, // Utiliser selectedQuizId à la place de quizId
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    return data.user; 
  } catch (error) {
    throw new Error(`Error signing in: ${error.message}`);
  }
  }
  
  



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
  
      const userId = data?.user?.id;
  
      if (!userId) {
        throw new Error('User ID not found in authentication data');
      }
  
      // Fetch the user's profile based on the user ID
      const profile = await this.getUserProfile(userId);
  
      // Extract token from the data object based on its structure
      const accessToken = data?.session?.access_token || '';
  
      return { authenticationData: { user: data?.user, session: data?.session }, profile, accessToken };
    } catch (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  }
  
  


async getUserProfile(userId: string): Promise<any> {
  const supabase = this.supabaseService.getClient();

  try {
    
    const { data, error } = await supabase
      .from('profile')
      .select('*')
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

  // async signin(email: string, password: string): Promise<any> {
  //   const supabase = this.supabaseService.getClient();

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });
  //   console.log("🚀 Signin Data:", data); // Ajouter un message pour les données retournées
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   if (!data || !data.user) {
  //     throw new NotFoundException('Utilisateur non trouvé');
  //   }
  //  // const role = await this.getUserRole(data.user.id);
  //   return "ok"; // Retourner les données de l'utilisateur avec son rôle
  // }



  async logout(): Promise<void> {
    const supabase = this.supabaseService.getClient(); // Obtenez l'instance du client Supabase
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      console.log("User successfully logged out.");
    } catch (error) {
      throw new Error("Error logging out: " + error.message);
    }
  }
  

  async getUserRole(userId: string): Promise<string> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.from('profile').select('role').eq('idprofile', userId).single();
    console.log("🚀 User Role Data:", data); // Ajouter un message pour les données retournées


    if (error) {
      console.error(error);
      throw new Error('Une erreur s\'est produite lors de la récupération du rôle utilisateur');
    }

    if (!data || !data.role) {
      return ''; // L'utilisateur peut ne pas avoir de profil ou de rôle
    }

    return data.role;
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
