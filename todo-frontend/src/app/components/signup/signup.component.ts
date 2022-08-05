import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email!: string;
  password!: string;
  users!: User[];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit() {
    const newUser: User = {
      email: this.email,
      password: this.password,
    };

    console.log(newUser);

    this.loginService.signUpUser(newUser).subscribe();

    this.email = '';
    this.password = '';
  }
}
