import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  login() { //Get data from form and send it do login service,
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/offers"); //navigate to offers
    }, error => {
      console.log(error);
      this.toastr.error(error.error); //show toastr warning
    })
  }

  logout() { //Get event from logout button and pass it to service
    this.accountService.logout(); //call method in service
    this.router.navigateByUrl("/"); //navigate to home
  }
}
