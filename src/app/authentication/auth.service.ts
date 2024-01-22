import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn:boolean = false;
  private apiUrl = 'http://localhost:3000/users';


  constructor(private http: HttpClient) { }

  get isLoggedIn(): boolean{
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return true;
    }
    return false;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getAllUsers().subscribe((data) => {
        if (data.length >= 0) {
          resolve(Number(data.length) + 1);
        }
        else {
          reject(0);
        }
      })
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((users: any) =>   {
        let user = users.filter((a: User) => a.email === email && a.password === password);
        if (user.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedIn;
        }
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      tap(() => {
        this.loggedIn = true;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn;
  }
}
