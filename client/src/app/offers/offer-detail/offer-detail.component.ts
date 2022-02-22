import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private offerService: OfferService, private route: ActivatedRoute, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe (user => this.user = user);
   }

  ngOnInit(): void {
    this.loadOffer();
    this.galleryOptions = [
      {
        width: "854px",
        height: "480px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]


  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    var url = "https://images7.alphacoders.com/288/288712.jpg";
    var url2 = "https://images8.alphacoders.com/437/thumb-1920-437653.jpg";
    imageUrls.push({
      small: url,
      medium: url,
      big: url
    });
    imageUrls.push({
      small: url2,
      medium: url2,
      big: url2
    });
    return imageUrls;

  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
      this.galleryImages = this.getImages();
    })
  }

}
