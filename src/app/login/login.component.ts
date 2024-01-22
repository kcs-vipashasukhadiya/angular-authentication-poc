import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

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

    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe({
      next: (data) => {
        if (data.length > 0) {
          console.log(data);
        }
        else {
          alert('Invalid Login!');
        }
      },
      error: (err) => { console.log(err); },
      complete: () => {
        debugger;
        console.log('login completed');
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
