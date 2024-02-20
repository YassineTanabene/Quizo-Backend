import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {

    this.supabase = require('@supabase/supabase-js').createClient(
      process.env.NEST_SUPABASE_URL,
      process.env.NEST_SUPABASE_SERVICE_ROLE_KEY
    );
  }



  getClient(): SupabaseClient {
    return this.supabase;
  }


}