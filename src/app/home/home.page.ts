// home.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false   // ← fixes NG6008: keeps it in NgModule
})
export class HomePage implements OnInit {

  userName = 'Officer';

  constructor(
    private router: Router,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    // Load the logged-in user's display name
    const { data } = await this.supabase.getUser();
    if (data?.user) {
      const meta = data.user.user_metadata;
      this.userName = meta?.['full_name']?.split(' ')[0] || 'Officer';
    }
  }

  verifyPermit() {
    // TODO: navigate to verify page or open QR scanner
    this.router.navigate(['/verify']);
  }

  viewPermits() {
    // TODO: navigate to permit list page
    this.router.navigate(['/permits']);
  }

  recentActivity() {
    // TODO: navigate to activity log page
    this.router.navigate(['/activity']);
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}