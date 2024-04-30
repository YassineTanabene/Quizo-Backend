import { Injectable } from '@nestjs/common';
import { CreateEmployeeResponseDto } from './dto/create-employee-response.dto';
import { UpdateEmployeeResponseDto } from './dto/update-employee-response.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class EmployeeResponseService {
  constructor(private readonly supabaseService: SupabaseService){}

   // -----------------------------------------------------Create Employee Response in public.employeeResponse with RPC------------------------------------------------------------------------------------------

async CreateEmployeeResponse(createDto:CreateEmployeeResponseDto): Promise<any>{
  const supabase = this.supabaseService.getClient();
  const {data,error : employeeResponseError} = await supabase.rpc('create_employe_response', {
    iduser: createDto.iduser,
    response : createDto.response, 
    isresponsecorrect : createDto.isresponsecorrect, 
    responsetime :createDto.responsetime, 
    feedback : createDto.feedback 
  });
  if (employeeResponseError){
    throw new Error(employeeResponseError.message);   
  }
  return console.log("🚀 ~ UserService ~ CreateEmployeeResponse ~ employeeResponse Created Successfully !",data),data;
  
  }



  // ----------------------------------------------Get All Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------

  async getAllEmployeeResponse() : Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase.rpc('get_all_employee_response');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching employee response:', error.message);
      return null;
    }
  }

    // ----------------------------------------------Get One Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


  async getOneEmployeeResponse(id: string): Promise<any> {
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase.rpc('get_one_employee_response', { id: id });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error fetching employee response:', error.message);
      return null;
    }
  }


  // ----------------------------------------------Update Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


  async updateEmployeeResponse(
    id: string,
   updateDto: UpdateEmployeeResponseDto
  ): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data,error } = await supabase.rpc('update_employee_response', {
      id: id,
      new_response: updateDto.response,
      new_isresponsecorrect: updateDto.isresponsecorrect,
      new_responsetime: updateDto.responsetime,
      new_feedback:updateDto.feedback,
      new_iduser: updateDto.iduser,
    });
  
    if (error) {
      throw new Error(error.message);
    }
     console.log("Profile updated successfully !");
     return data;
  }

  
  // ----------------------------------------------remove Employee Response in public.employee_response with RPC------------------------------------------------------------------------------------------


  async removeEmployeeRespone(id: string): Promise<void> {
    const supabase = this.supabaseService.getClient(); 
    const { error } = await supabase.rpc('remove_employee_response', {id:id});
    if (error) {
      throw new Error(error.message);
    }
    return console.log("🚀 ~ EmployeeResponseService ~ remove_employee_response ~ success:");

  }
}
