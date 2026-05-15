// signup.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false   // ← fixes NG6008: keeps it in NgModule
})
export class SignupPage {

  fullName   = '';
  email      = '';
  password   = '';
  loading    = false;
  errorMsg   = '';
  successMsg = '';

  constructor(
    private router: Router,
    private supabase: SupabaseService
  ) {}

  async signup() {
    if (!this.fullName || !this.email || !this.password) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMsg = 'Password must be at least 8 characters.';
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const { error } = await this.supabase.signUp(this.email, this.password, this.fullName);

    this.loading = false;

    if (error) {
      this.errorMsg = error.message || 'Sign up failed. Please try again.';
    } else {
      this.successMsg = 'Account created! Check your email to confirm.';
      // After a short delay, redirect to login
      setTimeout(() => this.router.navigate(['/login'], { replaceUrl: true }), 2500);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
