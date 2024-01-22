import { AfterContentChecked, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterContentChecked {
  title = 'angular-authentication-poc';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
