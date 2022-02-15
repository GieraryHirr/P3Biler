import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService{
  baseUrl = "https://localhost:7076/api/";


  constructor(private http: HttpClient) { }

  addOffer(model: any) {
    return this.http.post(this.baseUrl + "offer/addnewoffer", model);
  }

  uploadPhoto(obj: FormData) {
    return this.http.post(this.baseUrl + "offer/uploadphoto", obj).subscribe(res => {
      console.log(res)
    },error => {
      console.log(error);
      console.log(error.error);
    });
  }
}
