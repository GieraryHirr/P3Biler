import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../_services/account.service';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  @ViewChild("editForm2") editForm2: NgForm;
  offer: Offer;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event: any) { //If form is dirty and user will leave from site or close tab in browser.
    if (this.editForm.dirty || this.editForm2.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private offerService: OfferService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
      this.loadPhotos(offer.appUserId);
    })
  }

  updateOffer() {
    this.offerService.updateOffer(this.offer).subscribe(() => {
      console.log(this.offer);
      this.toastr.success("Offer updated successfuly");
      this.editForm.reset(this.offer);
      this.editForm2.reset(this.offer);
    })
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
