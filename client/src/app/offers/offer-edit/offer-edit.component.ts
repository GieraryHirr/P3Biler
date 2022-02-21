import { AccountService } from './../../_services/account.service';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  offer: Offer;

  constructor(private offerService: OfferService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
    })
  }

}
