import { Offer } from './../../_models/offer';
import { Component, Input, OnInit, Sanitizer } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;

  constructor(private sanitize: Sanitizer) { }

  ngOnInit(): void {
  }

}


