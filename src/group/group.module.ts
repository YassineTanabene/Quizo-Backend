import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SupabaseModule } from 'supabase/supabase .module';

@Module({
  imports:[SupabaseModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
