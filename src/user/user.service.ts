import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  constructor(private readonly supabaseService: SupabaseService){}

  async createUser(dto:CreateUserDto,firstName: string,lastName: string ): Promise<any> {
    const supabase = this.supabaseService.getClient();

    try {

      const { data: { user }, error: signUpError } = await supabase.auth.signUp({ email:dto.email, password:dto.password });
      
      if (signUpError) {
        throw new Error(signUpError.message);
      }

      const { data: profileData, error: profileError } = await supabase

        .from('profile')

        .insert({ firstName,lastName, idProfile: user.id }); 

      if (profileError) {

        await supabase.auth.admin.deleteUser(user.id); 

        throw new Error(profileError.message);
        
      }

      return console.log("User Profile created successfully ! ");
      
    } catch (error) {

      throw new Error("Error creating user with profile: " + error.message);
    }
   
  }


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
