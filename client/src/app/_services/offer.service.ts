import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = { //Header to authorization API
  headers: new HttpHeaders({
    Authorization: 'Baerer ' + JSON.parse(localStorage.getItem('user')).token
  })
}

@Injectable({
  providedIn: 'root'
})
export class OfferService{
  baseUrl = "https://localhost:7076/api/";
  constructor(private http: HttpClient) { }

  addOffer(model: any) { //Adding Offer
    return this.http.post(this.baseUrl + "offer/addnewoffer", model)
  }

  uploadPhoto(file: File) { //Uploading photo
    console.log(file);
    const formData = new FormData();
    formData.append("file", file, file.name); //Add file as FormData
    return this.http.post(this.baseUrl + "offer/uploadphoto", formData, httpOptions).subscribe(res => {
      console.log(res)
    },error => {
      console.log(error);
    });
  }

  getOffers() {
    return this.http.get
  }
}
