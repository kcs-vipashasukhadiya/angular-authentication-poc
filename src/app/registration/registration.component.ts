import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
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
        console.log(user);
        debugger;
        this.authService.register(user).subscribe({
          next: (data) => console.log(data),
          error: (err) => console.error(err),
          complete: () => console.log('user registration successfully')
        })
      });
  }
}
