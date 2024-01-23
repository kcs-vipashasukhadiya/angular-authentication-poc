import { Injectable, inject } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncEmailValidatorService {
authService = inject(AuthService)

  asyncEmailValidator(): AsyncValidatorFn {
    return (control: any): Observable<{ [key: string]: boolean } | null> => {
      return this.authService.getAllUsers().pipe(
        map((res: any) => {
          const IsEmailExists = res.filter((req: any) => req.email === control.value).length;
          if (IsEmailExists) {
            return { emailAlreadyExists: true };
          }
          else {
            return null;
          }
        })
      )
    }
  }
}
