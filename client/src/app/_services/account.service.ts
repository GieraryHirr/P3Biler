import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7076/api/";
  private currentUserSource = new ReplaySubject<User>(1) //It works like a buffer, we set that it must store only one last value.
  currentUser$ = this.currentUserSource.asObservable(); //We use rule that all variables with $ are observable.

  constructor(private http: HttpClient) { }

  login(model: any) //Service to login in client
  {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem("user", JSON.stringify(user)); //Send user to localstorage
          this.currentUserSource.next(user); //Send user to buffer
        }
      })
    );
  }

  setCurrentUser(user: User ){ //Sending user to buffer
    this.currentUserSource.next(user);
  }

  logout() { //Delete user from localstorage and buffer
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  register(model: any) { //service to register in client
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user)); //Send user to localstorage
          this.currentUserSource.next(user);
        }
      })
    )
  }
}
