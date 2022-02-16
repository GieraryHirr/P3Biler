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
  model: any = {};

  constructor(private offerService: OfferService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  addOffer() {
    const user: User = JSON.parse(localStorage.getItem("user")); //Get current user from local storage
    this.model.AppUserId = user.id; //Set ID for offer.

    this.offerService.addOffer(this.model).subscribe(response => {
      console.log(response);
      this.router.navigate(["/offer"]); //Go to all offers
    }), error => {
      console.log(error);
      this.toastr.error(error.error);
    }
  }
}


