import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = '';

  email;
  username;
  password;

  onSubmit() {
    this.http.post(this.baseUrl + '/createAccount', {
      "email": this.email,
      "username": this.username,
      "password": this.password
    }).subscribe(data => {
      const result = data;
    });
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!environment.production) {
      this.baseUrl = 'http://localhost:3000';
    }
  }

}
