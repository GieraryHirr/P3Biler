import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
  user: User;


  constructor(private offerService: OfferService, private route: ActivatedRoute, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe (user => this.user = user);
   }

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
    })
  }

}
