import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  file: File;


  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
  }

  onSelectFile($event, file: File) //Receive list of files
  {
    this.file = file[0]; //Get file from list
  }

  onUpload()
  {
    this.offerService.uploadPhoto(this.file); //Push file to servcice
  }
}
