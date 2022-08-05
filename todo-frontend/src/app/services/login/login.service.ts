import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/types/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlSignUp = 'http://localhost:3000/auth/signup';

  constructor(private http: HttpClient) {}

  signUpUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlSignUp, user, httpOptions);
  }
}
