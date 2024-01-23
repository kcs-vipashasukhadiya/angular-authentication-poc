import { AfterContentChecked, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterContentChecked {
  title = 'angular-authentication-poc';
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  apiUrl = environment.apiUrl;

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
