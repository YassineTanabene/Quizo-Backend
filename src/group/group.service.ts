import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class GroupService {
  constructor(private readonly supabaseService: SupabaseService){}


// -----------------------------------------------------Create Group in public.group without RPC------------------------------------------------------------------------------------------

  async createGroup(createDto: CreateGroupDto): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.rpc('create_group',{
      groupname: createDto.groupname,
      grouplocation: createDto.grouplocation,
      grouphead: createDto.grouphead,
    });
      

    if (error) {
      throw new Error(error.message);
    }
    console.log('Group created successfully !');
    return data;
  }

  // -----------------------------------------------------Get All Group  in public.group without RPC------------------------------------------------------------------------------------------


  async getAllGroup(): Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase
        .from('group')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching group:', error.message);
      return null;
    }
  }

  // -----------------------------------------------------Get One Group in public.group without RPC------------------------------------------------------------------------------------------


  async getOneGroup(id: string): Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase
        .from('group')
        .select('*')
        .eq('idgroup', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching group:', error.message);
      return null;
    }
  }

  // -----------------------------------------------------Update Group in public.group without RPC------------------------------------------------------------------------------------------

  async updateGroup(id: string, updateDto: UpdateGroupDto): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('group')
      .update({
        groupname: updateDto.groupname,
        grouphead: updateDto.grouphead,
        grouplocation: updateDto.grouplocation
      })
      .eq('idgroup', id);

    if (error) {
      throw new Error(error.message);
    }
    console.log('Group updated successfully !');
    return data;
  }

  // -----------------------------------------------------Delete Group in public.group without RPC------------------------------------------------------------------------------------------


  async removeGroup(id: string): Promise<void> {
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase
      .from('group')
      .delete()
      .eq('idgroup', id);

    if (error) {
      throw new Error(error.message);
    }
    console.log('Group removed successfully !');
  }




  // -----------------------------------------------------Create Employee Response in public.employeeResponse with RPC------------------------------------------------------------------------------------------

// async CreateGroup(createDto:CreateGroupDto): Promise<any>{
//   const supabase = this.supabaseService.getClient();
//   const {error : groupError} = await supabase.rpc('create_group', {
//     iduser: createDto.groupname,
//     response : createDto.grouphead, 
//     isresponsecorrect : createDto.grouplocation
//   });
//   if (groupError){
//     throw new Error(groupError.message);   
//   }
//   return console.log("🚀 ~ GroupService ~ CreateGroup ~ employeeResponse Created Successfully !");
//   }



//   // ----------------------------------------------Get All Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------

//   async getAllGroup() : Promise<any> {
//     const supabase = this.supabaseService.getClient();
//     try {
//       const { data, error } = await supabase.rpc('get_all_group');
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     } catch (error) {
//       console.error('Error fetching employee response:', error.message);
//       return null;
//     }
//   }

//     // ----------------------------------------------Get One Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


//   async getOneGroup(id: string): Promise<any> {
//     const supabase = this.supabaseService.getClient();
//     try {
//       const { data, error } = await supabase.rpc('get_one_employee_response', { id: id });
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     } catch (error) {
//       console.error('Error fetching employee response:', error.message);
//       return null;
//     }
//   }


//   // ----------------------------------------------Update Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


//   async updateGroup(
//     id: string,
//    updateDto: UpdateGroupDto
//   ): Promise<any> {
//     const supabase = this.supabaseService.getClient();
//     const { data,error } = await supabase.rpc('update_group', {
//       id: id,
//       new_response: updateDto.groupname,
//       new_isresponsecorrect: updateDto.grouphead,
//       new_responsetime: updateDto.grouplocation
//     });
  
//     if (error) {
//       throw new Error(error.message);
//     }
//      console.log("Group updated successfully !");
//      return data;
//   }

  
//   // ----------------------------------------------remove Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


//   async removeEmployeeRespone(id: string): Promise<void> {
//     const supabase = this.supabaseService.getClient(); 
//     const { error } = await supabase.rpc('remove_group', {id:id});
//     if (error) {
//       throw new Error(error.message);
//     }
//     return console.log("🚀 ~ GroupService ~ remove_group ~ success:");

//   }
}
