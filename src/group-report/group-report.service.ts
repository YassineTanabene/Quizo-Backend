import { Injectable } from '@nestjs/common';
import { CreateGroupReportDto } from './dto/create-group-report.dto';
import { UpdateGroupReportDto } from './dto/update-group-report.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class GroupReportService {
constructor(private readonly supabaseService: SupabaseService){}

// -----------------------------------------------------Create GroupReport in public.group_report  without RPC------------------------------------------------------------------------------------------

async createGroupReport(createDto: CreateGroupReportDto): Promise<any> {
  const supabase = this.supabaseService.getClient();
  const { data, error } = await supabase
    .from('group_report')
    .insert([
      {
        quizid: createDto.quizid,
        userid: createDto.userid,
        totalscore: createDto.totalscore,
        startingdate: createDto.startingdate,
        endingdate: createDto.endingdate,
        note: createDto.note,
        email: createDto.email,
        statut: createDto.statut,
      },  
    ]);

  if (error) {
    throw new Error(error.message);
  }
  console.log('Group Report created successfully !');
  return data;
}

// -----------------------------------------------------Get All GroupReport in public.group_report  without RPC------------------------------------------------------------------------------------------


async getAllGroupReport(): Promise<any> {
  const supabase = this.supabaseService.getClient();
  try {
    const { data, error } = await supabase
      .from('group_report')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching group report:', error.message);
    return null;
  }
}

// -----------------------------------------------------Get One GroupReport in public.group_report  without RPC------------------------------------------------------------------------------------------


async getOneGroupReport(quizId: string): Promise<any> {
  const supabase = this.supabaseService.getClient();
  try {
    const { data, error } = await supabase
      .from('group_report')
      .select('*')
      .eq('quizid', quizId);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching group reports by quiz id:', error.message);
    return null;
  }
}

// -----------------------------------------------------Update Group Report in public.group_report without RPC------------------------------------------------------------------------------------------

async updateGroupReport(id: string, updateDto: UpdateGroupReportDto): Promise<any> {
  const supabase = this.supabaseService.getClient();
  const { data, error } = await supabase
    .from('group_report')
    .update({
      totalscore: updateDto.totalscore,
      startingdate: updateDto.startingdate,
      endingdate: updateDto.endingdate,
      note: updateDto.note,
      user: updateDto.email,

    })
    .eq('idreport', id);

  if (error) {
    throw new Error(error.message);
  }
  console.log('Group updated successfully !');
  return data;
}

// -----------------------------------------------------Delete Report in public.group_report  without RPC------------------------------------------------------------------------------------------


async removeGroupReport(id: string): Promise<void> {
  const supabase = this.supabaseService.getClient();
  const { error } = await supabase
    .from('group_report')
    .delete()
    .eq('idreport', id);

  if (error) {
    throw new Error(error.message);
  }
  console.log('Group report removed successfully !');
}
}
