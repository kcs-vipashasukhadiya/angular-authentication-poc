import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { onDestroy } from '../authentication/on-destroy.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'dashboard';
  authService = inject(AuthService);
  users: User[];
  destroy$ = onDestroy();

  ngOnInit(): void {
    this.authService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {
        this.users = data as User[];
      },
      error: (err) => console.error(err),
      complete: () => console.log('getting data successfully')
    });
  }
}
