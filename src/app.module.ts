import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from 'supabase/supabase .module';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AppController],
  providers: [AppService,SupabaseService],
})
export class AppModule {}
