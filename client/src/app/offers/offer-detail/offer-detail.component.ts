import { Photo } from './../../_models/Photo';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

const photoPromise = new Promise<Photo[]>((resolve, reject) => {});



export interface Window {  }

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit, Window {
  offer: Offer;
  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private offerService: OfferService, private route: ActivatedRoute, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe (user => this.user = user);
   }

  ngOnInit(): void {
    this.startLoad();
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

  // Returns a new promise with the photos if the photos was loaded.
  loadPhotos(appOfferId: number): Promise<Photo[]>
  {
    // A promise has two outcomes, a "Resolve" and a "Reject".
    // If the resolve value has been set the promise is a success. "Set resolve value: 'resolve(photos)'"
    // If the reject value has been set the promise was a failure.  "Set reject value: 'reject(photos)'"
    return new Promise((resolve) => { this.offerService.getPhotosByAppOfferId(appOfferId).subscribe( photos => { return resolve(photos); } )});
  }

  // Start the load by getting an offer, then load the photos, when the photos are loaded call loadImages
  startLoad(): void
  {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer =>
      {
        this.offer = offer;

        // This makes sure that loadImages does not get called before the photos has been retrieved.
        // If the loadPhotos promise was rejected the images will not load.
        this.loadPhotos(offer.id).then(resolveValue => this.loadImages(resolveValue));
      });
  }

  // Load the images and point the galleryImages property to them
  loadImages(local_photos: Photo[]): void
  {
    const imageURLS: NgxGalleryImage[] = [];

    // Loop through each photo in the local_photos parameter.
    local_photos.forEach(photo =>
      {
        if (photo.isMain) {
          this.offer.mainPhotoPath = photo.path;
        }

        imageURLS.push(
          {
            small: photo.path,
            medium: photo.path,
            big: photo.path
          }
        )
      }
    );

    // Point the gallerImages property to the imageURLS
    this.galleryImages = imageURLS;
  }

  deleteOffer(offerId) {
    this.offerService.deleteOFfer(offerId).subscribe(() => {
      this.router.navigateByUrl("http://localhost:4200/*");
    });

  }
}
