import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../_models/offer';
import { Photo } from '../_models/Photo';


@Injectable({
  providedIn: 'root'
})
export class OfferService{
  httpOptions = { //Header to authorization API
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
    })
  }

  baseUrl = "https://localhost:7076/api/";
  constructor(private http: HttpClient) { }

  addOffer(model: Offer) { //Adding Offer
    return this.http.post(this.baseUrl + "offer/add-new-offer", model);
  }

  getOffers() {
    return this.http.get<Offer[]>(this.baseUrl + "offer");
  }

  getOffer(id: number) {
    return this.http.get<Offer>(this.baseUrl + "offer/" + id);
  }

  updateOffer(offer: Offer) {
    return this.http.put(this.baseUrl + "offer/update-offer", offer);
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.baseUrl + "offer/get-photos");
  }

  getPhotosByAppOfferId(appOfferId: number) {
    return this.http.get<Photo[]>(this.baseUrl + "offer/get-photos/" + appOfferId);
  }

  setMainPhoto(id: number, appOfferId: number) {
    return this.http.put(this.baseUrl + "offer/set-main-photo/" + id + "/"  + appOfferId,  {}); //put request need some object at the end
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "offer/delete-photo/" + photoId);
  }

  deleteOFfer(offerId: number) {
    return this.http.delete(this.baseUrl + "offer/delete-offer/" + offerId);
  }
}
