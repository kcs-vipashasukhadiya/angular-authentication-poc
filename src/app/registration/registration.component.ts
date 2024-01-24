import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { PasswordMatchService } from '../validators/password-match.service';
import { AsyncEmailValidatorService } from '../validators/async-email-validator.service';
import { takeUntil } from 'rxjs';
import { onDestroy } from '../authentication/on-destroy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  title = 'user-registration';
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  passwordMatchService = inject(PasswordMatchService);
  asyncEmailValidatorService = inject(AsyncEmailValidatorService);
  toastr = inject(ToastrService);
  registerForm: FormGroup;
  submitted: boolean = false;
  destroy$ = onDestroy();

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email], this.asyncEmailValidatorService.asyncEmailValidator()],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatchService.matchPassword,
      } as any
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
      this.authService.getUserCount().then((count: number) => {
        let user: User = new User(count, this.f['userName'].value, this.f['email'].value, this.f['password'].value);

        this.authService.register(user)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
          next: (data) => console.log(data),
          error: (err) => console.error(err),
          complete: () => {
            this.toastr.success('User registration successfully!');
          }
        })
      });
  }
}
