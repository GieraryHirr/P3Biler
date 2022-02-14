import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../_models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  baseUrl = "https://localhost:7076/api/";

  constructor(private http: HttpClient) { }

  getSeller(id: number) {
    return this.http.get<Seller>(this.baseUrl + "users/" + id);
  }
}
