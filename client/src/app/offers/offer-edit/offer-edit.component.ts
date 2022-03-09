import { User } from './../../_models/user';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../_services/account.service';
import { OfferService } from 'src/app/_services/offer.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  offer: Offer;
  offer2: any;
  editOfferForm: FormGroup;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOffer2().then(resolveValue => this.initializeForm(resolveValue));

  }

  initializeForm(offer2: Offer) {
    this.offer = offer2
    this.editOfferForm = new FormGroup({
      category: new FormControl(offer2.category,Validators.required),
      brand: new FormControl(offer2.brand,Validators.required),
      model: new FormControl(offer2.model,[Validators.required, Validators.maxLength(30)]),
      modelYear: new FormControl(offer2.modelYear,[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      kilometers: new FormControl(offer2.kilometers,[Validators.required, Validators.pattern("^[0-9]*$")]),
      engineSize: new FormControl(offer2.engineSize,[Validators.required, Validators.pattern("^[0-9]*$")]),
      horsepowers: new FormControl(offer2.horsepowers,[Validators.required, Validators.pattern("^[0-9]*$")]),
      fuel: new FormControl(offer2.fuel,Validators.required),
      gearbox: new FormControl(offer2.gearbox,[Validators.required]),
      color: new FormControl(offer2.color,Validators.required),
      price: new FormControl(offer2.price,[Validators.required, Validators.pattern("^[0-9]*$")]),
      post: new FormControl(offer2.post,[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
      city: new FormControl(offer2.city,Validators.required),
      description: new FormControl(offer2.description,[Validators.required, Validators.maxLength(500)]),
      tlfnr: new FormControl(offer2.tlfnr, [Validators.required,Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
    });
  }

  loadOffer() {
    this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.loadPhotos(offer.id);
    })

  }

  updateOffer() {
    this.mapFormToOffer();
    this.offerService.updateOffer(this.offer).subscribe(response => {
      console.log(response);
      console.log(this.offer);
      this.toastr.success("Offer updated successfuly");
    }), error => {
      console.log(error);
      this.toastr.error(error.error)
    }
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

  mapFormToOffer() {
    this.offer.category = this.editOfferForm.get("category").value;
    this.offer.brand = this.editOfferForm.get("brand").value;
    this.offer.model = this.editOfferForm.get("model").value;
    this.offer.modelYear = this.editOfferForm.get("modelYear").value;
    this.offer.kilometers = this.editOfferForm.get("kilometers").value;
    this.offer.engineSize = this.editOfferForm.get("engineSize").value;
    this.offer.horsepowers = this.editOfferForm.get("horsepowers").value;
    this.offer.fuel = this.editOfferForm.get("fuel").value;
    this.offer.gearbox = this.editOfferForm.get("gearbox").value;
    this.offer.color = this.editOfferForm.get("color").value;
    this.offer.price = this.editOfferForm.get("price").value;
    this.offer.post = this.editOfferForm.get("post").value;
    this.offer.city = this.editOfferForm.get("city").value;
    this.offer.description = this.editOfferForm.get("description").value;
    this.offer.tlfnr = this.editOfferForm.get("tlfnr").value;
  }

  loadOffer2(): Promise<Offer>{
    return new Promise((resolve) => {this.offerService.getOffer(+this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.loadPhotos(offer.id);
      return resolve(offer)})});
  }
}
