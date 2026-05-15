
import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  }

  // =====================================================
  // AUTHENTICATION
  // =====================================================

  // Create new account
  async signUp(
    email: string,
    password: string,
    fullName: string
  ) {

    return this.supabase.auth.signUp({

      email,
      password,

      options: {

        data: {
          full_name: fullName
        }

      }

    });

  }

  // Login existing user
  async signIn(
    email: string,
    password: string
  ) {

    return this.supabase.auth.signInWithPassword({

      email,
      password

    });

  }

  // Logout current user
  async signOut() {

    return this.supabase.auth.signOut();

  }

  // Get current logged in user
  async getUser() {

    return this.supabase.auth.getUser();

  }

  // =====================================================
  // PERMITS
  // =====================================================

  // Get all permits
  async getPermits() {

    return this.supabase
      .from('permits')
      .select(`
        *,
        permit_holders(
          first_name,
          last_name
        )
      `)
      .order('created_at', {
        ascending: false
      });

  }

  // Get permit using permit number
  async getPermitByNumber(
    permitNumber: string
  ) {

    return this.supabase
      .from('permits')
      .select(`
        *,
        permit_holders(
          first_name,
          last_name
        )
      `)
      .eq('permit_number', permitNumber)
      .single();

  }

  // =====================================================
  // VERIFICATION
  // =====================================================

  // Verify permit and log scan
  async verifyPermit(
    permitNumber: string,
    verifiedBy: string
  ) {

    // Search permit
    const { data, error } =
    await this.getPermitByNumber(
      permitNumber
    );

    // Permit not found
    if (error || !data) {

      return {
        status: 'NOT_FOUND',
        permit: null
      };

    }

    // Check if expired
    const today =
    new Date();

    const expiryDate =
    new Date(data.expiry_date);

    let verificationStatus =
    data.status;

    if (expiryDate < today) {

      verificationStatus =
      'EXPIRED';

    }

    // Save verification log
    await this.supabase
      .from('verification_logs')
      .insert({

        permit_id: data.id,

        verification_result:
        verificationStatus,

        verified_by:
        verifiedBy

      });

    // Return result
    return {

      status:
      verificationStatus,

      permit:
      data

    };

  }

  // =====================================================
  // PERMIT HOLDERS
  // =====================================================

  // Get all permit holders
  async getHolders() {

    return this.supabase
      .from('permit_holders')
      .select('*')
      .order('last_name');

  }

}