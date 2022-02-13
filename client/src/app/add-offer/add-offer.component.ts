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
  @Output() cancelAddingOffer = new EventEmitter()

  constructor(private offerService: OfferService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addOffer() {
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.model.AppUserId = user.id;
    
    this.offerService.addOffer(this.model).subscribe(response => {
      console.log(response);
    }), error => {
      console.log(error);
      this.toastr.error(error.error);
    }
  }
}


