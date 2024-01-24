import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { onDestroy } from '../authentication/on-destroy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  title = 'login';
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  loginForm: FormGroup;
  submitted: boolean = false;
  destroy$ = onDestroy();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (!data.length) {
            this.toastr.error('Invalid login!');
          }
          else {
            this.toastr.clear();
          }
        },
        error: (err) => { this.toastr.error(err); },
        complete: () => {
          this.router.navigate(['/dashboard']);
        }
      })
  }
}
