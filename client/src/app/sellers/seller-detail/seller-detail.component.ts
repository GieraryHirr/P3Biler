import { SellersService } from './../../_services/sellers.service';
import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/_models/seller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnInit {
  seller: Seller;
  id: number = 1;

  constructor(private sellerService: SellersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSeller();
  }

  loadSeller() {
    this.sellerService.getSeller(this.id).subscribe(seller => {
      this.seller = seller;
    })
  }

}
