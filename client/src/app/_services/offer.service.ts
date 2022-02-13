import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService{
  baseUrl = "https://localhost:7076/api/";


  constructor(private http: HttpClient) { }

  addOffer(model: any) {
    return this.http.post(this.baseUrl + "offer/addnewoffer", model);
  }
}
