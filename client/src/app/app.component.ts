import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem("user")); //Get user from localstorage
    this.accountService.setCurrentUser(user);
  }

  getUsers() {
    this.http.get('https://localhost:7076/api/users').subscribe(response =>{
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
