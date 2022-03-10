import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { User } from 'src/app/_models/user';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-my-offer-list',
  templateUrl: './my-offer-list.component.html',
  styleUrls: ['./my-offer-list.component.css']
})
export class MyOfferListComponent implements OnInit {
  offers: Offer[]

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    const user: User = JSON.parse(localStorage.getItem("user")); //Get current user from local storage
    this.offerService.getMyOffers(parseInt(user.id)).subscribe(offers => {
      this.offers = offers;
    })
  }

}
