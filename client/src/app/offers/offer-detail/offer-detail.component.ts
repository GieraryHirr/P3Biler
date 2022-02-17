import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;


  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
    })
  }

}
