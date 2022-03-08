import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from './../_models/offer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from './../_services/offer.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm: FormGroup;

  constructor(private offerService: OfferService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addOfferForm = new FormGroup({
      category: new FormControl("",Validators.required),
      brand: new FormControl("",Validators.required),
      model: new FormControl("",[Validators.required, Validators.maxLength(30)]),
      modelYear: new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      kilometers: new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$")]),
      engineSize: new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$")]),
      horsepowers: new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$")]),
      fuel: new FormControl("",Validators.required),
      gearbox: new FormControl("",[Validators.required]),
      color: new FormControl("",Validators.required),
      price: new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$")]),
      post: new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
      city: new FormControl("",Validators.required),
      description: new FormControl("",[Validators.required, Validators.maxLength(500)]),
      appUserId: new FormControl(""),
      tlfnr: new FormControl("", [Validators.required,Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
    })
  }

  addOffer() {
    const user: User = JSON.parse(localStorage.getItem("user")); //Get current user from local storage
    this.addOfferForm.controls["appUserId"].setValue(parseInt(user.id)); //Set ID for offer.)

    this.offerService.addOffer(this.addOfferForm.value).subscribe(response => {
      console.log(response);
      this.router.navigate(["/offer"]); //Go to all offers
    }), error => {
      console.log(error);
      this.toastr.error(error.error);
    }
  }
}


