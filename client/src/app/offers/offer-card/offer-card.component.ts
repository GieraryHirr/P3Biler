import { Offer } from './../../_models/offer';
import { Component, Input, OnInit, Sanitizer, SecurityContext } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;


  constructor() { }

  ngOnInit(): void {

  }

}
