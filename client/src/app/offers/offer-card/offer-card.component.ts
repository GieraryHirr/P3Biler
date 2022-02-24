import { OfferService } from 'src/app/_services/offer.service';
import { Offer } from './../../_models/offer';
import { Component, Input, OnInit, Sanitizer, SecurityContext } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;


  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.loadPhotos(this.offer.id);

  }

  loadPhotos(appOfferId: number)
  {
    this.offerService.getPhotosByAppOfferId(appOfferId).subscribe( photos => {
      for (let photo of photos)
      {
        if (photo.isMain)
        {
          this.offer.mainPhotoPath = photo.path;
        }
      }
    })
  }

}
