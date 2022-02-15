import { ToastrService } from 'ngx-toastr';
import { OfferService } from './../../_services/offer.service';
import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  formData: FormData = new FormData();
  file2: File;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
  }

  onSelectFile($event, file)
  {
    this.file2 = file;
    this.formData.append(file.name, this.file2);
  }

  onUpload()
  {
    this.offerService.uploadPhoto(this.formData);
  }
}
