import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      login: new FormControl("",Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues("password")]),
      email: new FormControl("", [Validators.required, Validators.email]),
      tlfnr: new FormControl("", Validators.required),
      fornavn: new FormControl("", Validators.required),
      efternavn: new FormControl("", Validators.required)
    })

    //If we type password and confirmed password our form will be valid, but if we change password form still be valid.
    this.registerForm.controls.password.valueChanges.subscribe(() => { //Here we solving this problem by checking that value was changed
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true} //If doesn´t match return null, is does match returning object
    }
  }

  register() { //Get data from form and pass it to service
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl("/offer");
    }, error => {
      console.log(error);
    })

  }

  cancel() { //Bridge between view and service
    this.cancelRegister.emit(false); //Pass event from buton to service
  }

}
