import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../_models/offer';


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
    return this.http.post(this.baseUrl + "offer/addnewoffer", model);
  }

  uploadPhoto(file: File) { //Uploading photo
    console.log(file);
    const formData = new FormData();
    formData.append("file", file, file.name); //Add file as FormData
    return this.http.post(this.baseUrl + "offer/uploadphoto", formData);
  }

  getOffers() {
    return this.http.get<Offer[]>(this.baseUrl + "offer");
  }

  getOffer(id: number) {
    return this.http.get<Offer>(this.baseUrl + "offer/" + id);
  }
}
