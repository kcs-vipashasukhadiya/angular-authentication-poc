import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data as User[];
      },
      error: (err) => console.error(err),
      complete: () => console.log('getting data successfully')
    });
  }
}
