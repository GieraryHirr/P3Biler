import { Photo } from './../../_models/Photo';
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

  getImages(): NgxGalleryImage[]
  {
    const imageUrls: NgxGalleryImage[] = [];

    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer =>
      {
        this.offerService.getPhotosByAppOfferId(offer.id).subscribe(photos =>
          {
            for (let photo of photos)
            {
              if (photo.isMain)
              {
                this.offer.mainPhotoPath = photo.path;
              }

              imageUrls.push({
                small: photo?.path,
                medium: photo?.path,
                big: photo?.path
              })
            }
          })
      })
       return imageUrls;
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
      this.galleryImages = this.getImages();
    })
  }







  /*loadOffer2() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
      this.loadPhotos(offer.id);
      console.warn(this.offer.photos)
      this.galleryImages = this.getImages2();
    })
  }

  loadPhotos(appOfferId: number)
  {
    this.offerService.getPhotosByAppOfferId(appOfferId).subscribe( photos => {
      this.offer.photos = photos;
      console.warn(this.offer.photos)
    })
  }

  getImages2(): NgxGalleryImage[] {
    const imageUrls = [];
    console.warn(this.offer.photos)
    for (const photo of this.offer.photos) {
      imageUrls.push({
        small: photo?.path,
        medium: photo?.path,
        big: photo?.path
      })
    }
    return imageUrls;
  }*/
}
