import { account } from './../_models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editForm: FormGroup
  account: account

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAccount().then(resolveValue => this.initializeForm(resolveValue));
  }

  initializeForm(account) {
    this.account = account
    this.editForm = new FormGroup({
      login: new FormControl(account.login,Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues("password")]),
      email: new FormControl(account.email, [Validators.required, Validators.email]),
      fornavn: new FormControl(account.fornavn, Validators.required),
      efternavn: new FormControl(account.efternavn, Validators.required)
    })

    //If we type password and confirmed password our form will be valid, but if we change password form still be valid.
    this.editForm.controls.password.valueChanges.subscribe(() => { //Here we solving this problem by checking that value was changed
      this.editForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true} //If doesn´t match return null, is does match returning object
    }
  }

  save() { //Get data from form and pass it to service
    this.mapFormToAccount();
    this.accountService.updateAccount(this.account).subscribe(response => {
      this.router.navigateByUrl("/*");
      this.accountService.logout();
    }, error => {
      console.log(error);
    })
  }

  mapFormToAccount() {
    this.account.login = this.editForm.get("login").value;
    this.account.password = this.editForm.get("password").value;
    this.account.email = this.editForm.get("email").value;
    this.account.fornavn = this.editForm.get("fornavn").value;
    this.account.efternavn = this.editForm.get("efternavn").value;
  }

  loadAccount(): Promise<account>{
    const user: User = JSON.parse(localStorage.getItem("user")); //Get current user from local storage
    return new Promise((resolve) => {this.accountService.getAccount(parseInt(user.id)).subscribe(account => {
      console.log(account)
      return resolve(account)
    })});
  }

  cancel() {
    this.router.navigateByUrl("/*")
  }

}
