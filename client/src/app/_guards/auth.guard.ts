import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { //AuthGuard is created to prevent unauthorized access to routes. For example if we hiding button with link inside, user can still type this link in browser and get access to foridden data. Auth Guard just blocking "link" for unauthorized users.

  constructor(private accountService: AccountService, private toastr: ToastrService) {}
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true; //Return an observable boolean
        this.toastr.error("You are not logged in!") //using toastr to display warning.
      })
    )
  }

}
