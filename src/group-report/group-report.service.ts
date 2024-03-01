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
        totalscore: createDto.totalscore,
        startingdate: createDto.startingdate,
        endingdate: createDto.endingdate,
        notes: createDto.notes
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


async getOneGroupReport(id: string): Promise<any> {
  const supabase = this.supabaseService.getClient();
  try {
    const { data, error } = await supabase
      .from('group_report')
      .select('*')
      .eq('idreport', id)
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

// -----------------------------------------------------Update Group Report in public.group_report without RPC------------------------------------------------------------------------------------------

async updateGroupReport(id: string, updateDto: UpdateGroupReportDto): Promise<any> {
  const supabase = this.supabaseService.getClient();
  const { data, error } = await supabase
    .from('group_report')
    .update({
      totalscore: updateDto.totalscore,
      startingdate: updateDto.startingdate,
      endingdate: updateDto.endingdate,
      notes: updateDto.notes
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
